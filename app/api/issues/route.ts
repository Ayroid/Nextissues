import { issueSchema } from "@/app/formValidationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
  const body = await request.json();
  const validate = issueSchema.safeParse(body);

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
