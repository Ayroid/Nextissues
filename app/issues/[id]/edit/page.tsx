import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: {
    id: string;
  };
}

const NewIssuePage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  return {
    title: `${issue?.title}`,
    description: issue?.description,
  };
}

export default NewIssuePage;
