import prisma from "@/prisma/client";
import IssueChart from "./components/IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import IssueSummary from "./components/IssueSummary";
import LatestIssues from "./components/LatestIssues";

const Home = async () => {
  const openIssues = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const inProgressIssues = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  const closedIssues = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary
          open={openIssues}
          inProgress={inProgressIssues}
          closed={closedIssues}
        />
        <IssueChart
          open={openIssues}
          inProgress={inProgressIssues}
          closed={closedIssues}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export default Home;
