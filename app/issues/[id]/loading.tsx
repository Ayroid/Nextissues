import { Skeleton } from "@/app/components";
import { Card, Flex } from "@radix-ui/themes";

const LoadingIssuePage = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <Flex my={"3"} gap={"3"}>
        <Skeleton width={"5rem"} />
        <Skeleton width={"8rem"} />
      </Flex>
      <Card className="prose mt-5">
        <Skeleton count={5} />
      </Card>
    </div>
  );
};

export default LoadingIssuePage;
