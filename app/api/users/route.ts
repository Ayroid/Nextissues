import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const GET = async (request: NextRequest) => {
  const users = await prisma.user.findMany();
  return NextResponse.json(users, { status: 200 });
};

export { GET };
