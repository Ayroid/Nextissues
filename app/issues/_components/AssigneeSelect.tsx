"use client";
import { Issue, User } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  issue: Issue;
}

const AssigneeSelect = ({ issue }: Props) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get<User[]>("/api/users");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <Skeleton height="2rem" width="100%" />;

  if (error) return null;

  const assignIssueToUser = (userId: string | null) => {
    userId = userId === "unassigned" ? null : userId;
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId,
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || "unassigned"}
      onValueChange={assignIssueToUser}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
