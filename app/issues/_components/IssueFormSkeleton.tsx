import { Skeleton } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-xl flex flex-col gap-5">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
      <Skeleton height="2rem" width="6rem" />
    </div>
  );
};

export default IssueFormSkeleton;
