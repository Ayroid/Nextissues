import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import delay from "delay";

const GET = async (request: NextRequest) => {
  await delay(5000);
  const users = await prisma.user.findMany();
  return NextResponse.json(users, { status: 200 });
};

export { GET };
