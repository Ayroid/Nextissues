import { Card, Flex, Skeleton, Grid, Box } from "@radix-ui/themes";

const LoadingIssuePage = () => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box className="max-w-xl">
        <Skeleton height="2rem" />
        <Flex my={"3"} gap={"3"}>
          <Skeleton height="2rem" width="5rem" />
          <Skeleton height="2rem" width="8rem" />
        </Flex>
        <Card className="prose mt-5">
          <Skeleton height="1.5rem" className="my-2" />
          <Skeleton height="1.5rem" className="my-2" />
          <Skeleton height="1.5rem" className="my-2" />
          <Skeleton height="1.5rem" className="my-2" />
          <Skeleton height="1.5rem" className="my-2" />
        </Card>
      </Box>
      <Box>
        <Skeleton height="2rem" width="6rem" />
      </Box>
    </Grid>
  );
};

export default LoadingIssuePage;
