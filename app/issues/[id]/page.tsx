import { IssueStatusBadge } from "@/app/components/";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";

interface Props {
  params: {
    id: string;
  };
}

const IssuePage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{issue?.title}</Heading>
        <Flex my={"3"} gap={"3"}>
          <IssueStatusBadge status={issue?.status} />
          <Text className="text-sm">{issue?.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose mt-5">
          <ReactMarkdown>{issue?.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Link href={`/issues/${id}/edit`}>
          <Button>
            <Pencil2Icon />
            Edit Issue
          </Button>
        </Link>
      </Box>
    </Grid>
  );
};

export default IssuePage;
