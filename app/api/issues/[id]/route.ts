import { issueSchema } from "@/app/formValidationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

const PATCH = async (request: NextRequest, { params: { id } }: Props) => {
  const body = await request.json();
  const validate = issueSchema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json(validate.error.errors, { status: 400 });
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
      title: validate.data.title,
      description: validate.data.description,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
};

const DELETE = async (request: NextRequest, { params: { id } }: Props) => {
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
