"use client";
import { createIssueSchema } from "@/app/formValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { LuInfo } from "react-icons/lu";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type CreateIssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateIssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
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
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button type="submit">Submit Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
