import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "@/app/formValidationSchemas";

const POST = async (request: NextRequest) => {
  const body = await request.json();
  const validate = createIssueSchema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json(validate.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: validate.data.title,
      description: validate.data.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
};

export { POST };
