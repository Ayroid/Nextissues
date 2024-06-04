import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";
import IssueStatusBadge from "./IssueStatusBadge";
import { Issue } from "@prisma/client";

interface Props {
  issue: Issue;
}

const IssueDetails = ({ issue }: Props) => {
  return (
    <>
      <Heading>{issue?.title}</Heading>
      <Flex my={"3"} gap={"3"}>
        <IssueStatusBadge status={issue?.status} />
        <Text className="text-sm">{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full mt-5">
        <ReactMarkdown>{issue?.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
