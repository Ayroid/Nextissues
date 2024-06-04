import { IssueDetails } from "@/app/components/";
import { EditIssueTabs } from "@/app/issues/_components/";
import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";

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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4 ">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueTabs issueId={id} />
      </Box>
    </Grid>
  );
};

export default IssuePage;
