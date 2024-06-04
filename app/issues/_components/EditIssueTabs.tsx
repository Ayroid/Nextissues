import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";

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

      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" style={{ width: "100%" }}>
            <TrashIcon />
            Delete Issue
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
              <Button color="red">Delete</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Flex>
  );
};

export default EditIssueTabs;
