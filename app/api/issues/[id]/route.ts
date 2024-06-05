import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/formValidationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

const PATCH = async (request: NextRequest, { params: { id } }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const validate = patchIssueSchema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json(validate.error.errors, { status: 400 });
  }

  const { assignedToUserId, title, description } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  if (!issue) {
    return NextResponse.json("Issue not found", { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
};

const DELETE = async (request: NextRequest, { params: { id } }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  if (!issue) {
    return NextResponse.json("Issue not found", { status: 404 });
  }

  await prisma.issue.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json("Issue deleted", { status: 200 });
};

export { PATCH, DELETE };
