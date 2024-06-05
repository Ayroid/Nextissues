import authOptions from "@/app/auth/authOptions";
import { IssueDetails } from "@/app/components/";
import { EditIssueTabs } from "@/app/issues/_components/";
import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";

interface Props {
  params: {
    id: string;
  };
}

// THIS WILL FETCH DATA ONCE AND CACHE IT

const fetchIssue = cache((issueId: string) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  })
);

const IssueDetailsPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchIssue(id);

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <EditIssueTabs issue={issue} />
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await fetchIssue(id);

  return {
    title: `${issue?.title}`,
    description: issue?.description,
  };
}

export default IssueDetailsPage;
