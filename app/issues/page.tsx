import { IssueActions, IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import { ChevronUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    {
      label: "Title",
      value: "title",
    },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Created At",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const statuses = Object.values(Status);
  const finalStatus = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: finalStatus,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <Link
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </Link>
                {column.value === searchParams.orderBy && (
                  <ChevronUpIcon className="inline ml-1" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
