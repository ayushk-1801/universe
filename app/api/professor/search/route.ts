import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const professors = await prisma.professor.findMany({
      select: {
        name: true,
      },
    });
    return NextResponse.json(professors);
  } catch (error) {
    return NextResponse.error();
  }
}
