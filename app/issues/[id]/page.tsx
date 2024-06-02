import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Heading, Flex, Text, Card } from "@radix-ui/themes";
import React from "react";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

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
      <Heading>{issue?.title}</Heading>
      <Flex my={"3"} gap={"3"}>
        <IssueStatusBadge status={issue?.status} />
        <Text className="text-sm">{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card>{issue?.description}</Card>
    </div>
  );
};

export default IssuePage;
