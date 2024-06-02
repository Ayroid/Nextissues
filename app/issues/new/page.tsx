"use client";
import React from "react";
import { TextField, Button, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LuInfo } from "react-icons/lu";

interface CreateIssueForm {
  title: string;
  description: string;
}

const NewIssuePage: React.FC = () => {
  const { register, control, handleSubmit } = useForm<CreateIssueForm>();
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const submitCreateIssueForm = async (data: CreateIssueForm) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("Unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Icon>
            <LuInfo />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
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
    </div>
  );
};

export default NewIssuePage;
