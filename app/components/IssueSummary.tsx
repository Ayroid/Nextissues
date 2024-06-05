import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    {
      label: "Open",
      value: open,
      status: "OPEN",
    },
    {
      label: "In-Progress",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Closed",
      value: closed,
      status: "CLOSED",
    },
  ];
  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Link href={`/issues?status=${container.status}`}>
            <Flex direction="column" gap="1">
              <Text className="text-sm font-medium">
                {container.label} Issues
              </Text>
              <Text size="5" className="font-bold">
                {container.value}
              </Text>
            </Flex>
          </Link>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
