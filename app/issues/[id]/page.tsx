import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const IssuePage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  if (!issue) notFound();

  return (
    <div>
      <p>{issue?.id}</p>
      <p>{issue?.title}</p>
      <p>{issue?.description}</p>
      <p>{issue?.status}</p>
      <p>{issue?.createdAt.toDateString()}</p>
      <p>{issue?.updatedAt.toDateString()}</p>
    </div>
  );
};

export default IssuePage;
