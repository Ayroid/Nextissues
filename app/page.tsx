import prisma from "@/prisma/client";
import IssueChart from "./components/IssueChart";

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
    <IssueChart
      open={openIssues}
      inProgress={inProgressIssues}
      closed={closedIssues}
    />
  );
};

export default Home;
