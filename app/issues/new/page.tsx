"use client";
import { TextArea, TextField, Button } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Issue Title" />
      <TextArea placeholder="Description" />
      <Button>Submit Issue</Button>
    </div>
  );
};

export default NewIssuePage;
