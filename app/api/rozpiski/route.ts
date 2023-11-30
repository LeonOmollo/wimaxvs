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
  let { startLocation, endLocation } = body;

  try {
    let theFirm = await prisma.firm.findUnique({
      where: {
        id: currentDriver?.currentFirm?.id,
      },
    });
    let newStartLocation = await prisma.startLocation.create({
      data: {
        city: startLocation,
      },
    });
    let newEndLocation = await prisma.location.create({
      data: {
        city: endLocation,
      },
    });
    await prisma.settlement.create({
      data: {
        approvalStatus: false,
        startLocation: {
          connect: {
            id: newStartLocation.id,
          },
        },
        endLocation: {
          connect: {
            id: newEndLocation.id,
          },
        },
        Firm: {
          connect: {
            id: theFirm!.id,
          },
        },
      },
    });

    let allTheTasks = await prisma.settlement.findMany({
      include: {
            startLocation: true,
            endLocation: true,
          driver: true
      },
    });
    return NextResponse.json({
      code: 200,
      message: "Pomyślnie dodano nowy tras",
      allTheTasks,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({
          code: 500,
          message: "Ta trasa jest już zarejestrowana w bazie danych.",
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