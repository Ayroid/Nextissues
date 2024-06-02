"use client";
import React from "react";
import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CreateIssueForm {
  title: string;
  description: string;
}

const NewIssuePage: React.FC = () => {
  const { register, control, handleSubmit } = useForm<CreateIssueForm>();
  const router = useRouter();

  const submitCreateIssueForm = async (data: CreateIssueForm) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      console.log(error);
      alert("An error occurred while creating the issue.");
    }
  };

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(submitCreateIssueForm)}
    >
      <TextField.Root
        placeholder="Issue Title"
        {...register("title", { required: true })}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <Button type="submit">Submit Issue</Button>
    </form>
  );
};

export default NewIssuePage;
