import React from "react";
import { Badge } from "@radix-ui/themes";
import { Status } from "@prisma/client";

interface Props {
  status: Status;
}

const statusColorMap: Record<
  Status,
  { label: string; color: "green" | "violet" | "red" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusColorMap[status].color}>
      {statusColorMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
