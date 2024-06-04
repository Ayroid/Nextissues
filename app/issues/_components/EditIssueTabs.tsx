"use client";

import { LoadingSpinner } from "@/app/components";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  issueId: string;
}

const EditIssueButton = ({ issueId }: Props) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button style={{ width: "100%" }}>
        <Pencil2Icon />
        Edit Issue
      </Button>
    </Link>
  );
};

const DeleteIssueButton = ({ issueId }: Props) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const deleteIssue = async (issueId: string) => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError("Unexpected error occurred. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" style={{ width: "100%" }} disabled={isDeleting}>
            <TrashIcon />
            Delete Issue
            {isDeleting && <LoadingSpinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="25rem">
          <AlertDialog.Title>Confirm Issue Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue?
          </AlertDialog.Description>
          <Flex gap="2" mt="5">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={() => deleteIssue(issueId)}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error !== null}>
        <AlertDialog.Content maxWidth="25rem">
          <AlertDialog.Title>Issue Deletion Error</AlertDialog.Title>
          <AlertDialog.Description>{error}</AlertDialog.Description>
          <AlertDialog.Action>
            <Button
              mt="5"
              variant="soft"
              color="gray"
              onClick={() => setError(null)}
            >
              Okay
            </Button>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

const EditIssueTabs = ({ issueId }: Props) => {
  return (
    <Flex direction="column" gap="2">
      <EditIssueButton issueId={issueId} />
      <DeleteIssueButton issueId={issueId} />
    </Flex>
  );
};

export default EditIssueTabs;
