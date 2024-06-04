import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  issueId: string;
}

const EditIssueTabs = ({ issueId }: Props) => {
  return (
    <Flex direction="column" gap="2">
      <Link href={`/issues/${issueId}/edit`}>
        <Button style={{ width: "100%" }}>
          <Pencil2Icon />
          Edit Issue
        </Button>
      </Link>

      <Button color="red" style={{ width: "100%" }}>
        <TrashIcon />
        Delete Issue
      </Button>
    </Flex>
  );
};

export default EditIssueTabs;
