import prisma from "@/prisma/client";
import IssueChart from "./components/IssueChart";
import { Flex, Grid, Heading, Separator, Box, Card } from "@radix-ui/themes";
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

  const issues = {
    open: openIssues,
    inProgress: inProgressIssues,
    closed: closedIssues,
  };

  return (
    <Flex direction="column" gap="9">
      <Heading size="8" className="inline">
        Dashboard
      </Heading>
      <Grid columns={{ initial: "1", md: "2" }} gap="9">
        <Flex direction="column" gap="5">
          <IssueSummary issues={issues} />
          <Separator my="3" size="4" />
          <IssueChart issues={issues} />
        </Flex>
        <LatestIssues />
      </Grid>
    </Flex>
  );
};

export default Home;
