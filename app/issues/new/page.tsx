"use client";
import React from "react";
import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Issue Title" />
      <SimpleMDE placeholder="Description" />
      <Button>Submit Issue</Button>
    </div>
  );
};

export default NewIssuePage;
