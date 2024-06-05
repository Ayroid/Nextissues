import authOptions from "@/app/auth/authOptions";
import { Card, Flex, Skeleton, Grid, Box } from "@radix-ui/themes";
import { getServerSession } from "next-auth";

const LoadingIssuePage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <Skeleton height="2rem" width="50%" />
        <Flex my={"3"} gap={"3"}>
          <Skeleton height="2rem" width="5rem" />
          <Skeleton height="2rem" width="8rem" />
        </Flex>
        <Card className="mt-5">
          <Skeleton height="1.5rem" className="my-2" />
          <Skeleton height="1.5rem" className="my-2" />
          <Skeleton height="1.5rem" className="my-2" />
          <Skeleton height="1.5rem" className="my-2" />
          <Skeleton height="1.5rem" className="my-2" />
          <Skeleton height="1.5rem" className="my-2" />
          <Skeleton height="1.5rem" className="my-2" />
          <Skeleton height="1.5rem" className="my-2" />
        </Card>
      </Box>
      {session && (
        <Flex direction="column" gap="2">
          <Skeleton height="2rem" width="100%" />
          <Skeleton height="2rem" width="100%" />
          <Skeleton height="2rem" width="100%" />
        </Flex>
      )}
    </Grid>
  );
};

export default LoadingIssuePage;
