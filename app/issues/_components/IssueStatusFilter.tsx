"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const issueStatuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const applyFilter = (status: string) => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (searchParams.get("orderBy"))
      params.set("orderBy", searchParams.get("orderBy")!);

    const query = params.size ? "?" + params.toString() : "";

    router.push("/issues/" + query);
  };

  return (
    <Select.Root
      onValueChange={applyFilter}
      defaultValue={searchParams.get("status") ?? undefined}
    >
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
