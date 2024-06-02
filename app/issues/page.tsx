import React from "react";
import { Button, Link } from "@radix-ui/themes";

const IssuesPage = () => {
  return (
    <div>
      <h1>Issues</h1>
      <Link href="/issues/new">
        <Button>New Issue</Button>
      </Link>
    </div>
  );
};

export default IssuesPage;
