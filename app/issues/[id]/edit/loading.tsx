import { Skeleton } from "@radix-ui/themes";

const LoadingNewIssuePage = () => {
  return (
    <div className="max-w-xl flex flex-col gap-5">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </div>
  );
};

export default LoadingNewIssuePage;
