"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const issueStatuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();

  const applyFilter = (status: string) => {
    const query = status === " " ? "" : `?status=${status}`;
    router.push("/issues/" + query);
  };

  return (
    <Select.Root onValueChange={applyFilter}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {issueStatuses.map((status) => (
          <Select.Item key={status.label} value={status.value ?? " "}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
