import prisma from "@/prisma/client";
import IssueSummary from "./components/IssueSummary";

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
    <IssueSummary
      open={openIssues}
      inProgress={inProgressIssues}
      closed={closedIssues}
    />
  );
};

export default Home;
