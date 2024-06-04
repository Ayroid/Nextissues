import { Skeleton, Flex } from "@radix-ui/themes";

const loading = () => {
  const issues = [1, 2, 3, 4, 5];

  return (
    <div>
      <Skeleton height="2rem" width="5rem" className="mb-5" />
      {issues.map((issue) => (
        <Flex key={issue} my="3" gap="3">
          <Skeleton width="100%" height="2rem" />
          <Skeleton
            width="100%"
            height="2rem"
            className="hidden md:table-cell"
          />
          <Skeleton
            width="100%"
            height="2rem"
            className="hidden md:table-cell"
          />
        </Flex>
      ))}
    </div>
  );
};

export default loading;
