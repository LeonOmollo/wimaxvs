import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { SafeDriver } from "@/app/types";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentDriver: Partial<SafeDriver> | null = await getCurrentDriver();

  if (!currentDriver) {
    return NextResponse.json({ code: 500, message: "Nieznany użytkownik." });
  }

  if (currentDriver?.role !== "ZARZAD") {
    return NextResponse.json({ code: 400, message: "Nie jestes Zarżądem" });
  }

  const body = await req.json();
  let { carImage, registration, carMark, carModel } = body;

  try {
    let theFirm = await prisma.firm.findUnique({
      where: {
        id: currentDriver?.currentFirm?.id,
      },
    });
    let newCar = await prisma.vehicle.create({
      data: {
        registration,
        carMark,
        carModel,
        carImage,
        mileage: 0,
      },
    });

    await prisma.vehicle.update({
      where: {
        id: newCar?.id,
      },
      data: {
        currentFirm: {
          connect: {
            id: theFirm?.id,
          },
        },
      },
    });
    let allTheVehicles = await prisma.vehicle.findMany({
      include: {
        currentDriver: true,
        currentFirm: true,
      },
    });
    return NextResponse.json({
      code: 200,
      message: "Pomyślnie dodano nowy pojazd",
      allTheVehicles,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({
          code: 500,
          message: "Istnieje pojazd z dokładnie taką samą rejestracją.",
        });
      }
    } else {
      console.log(error);
      return NextResponse.json({
        code: 500,
        message: "Nieznany błąd Prisma.",
        error,
      });
    }
  }
}