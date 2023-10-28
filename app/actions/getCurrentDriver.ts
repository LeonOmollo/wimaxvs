import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentDriver() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentDriver = await prisma.driver.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentDriver) {
      return null;
    }

    return {
      ...currentDriver,
    };
  } catch (error: any) {
    return null;
  }
}