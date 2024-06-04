"use client";
import { FormErrorMessage, LoadingSpinner } from "@/app/components/";
import { issueSchema } from "@/app/formValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { LuInfo } from "react-icons/lu";
import { z } from "zod";
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type CreateIssueForm = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateIssueForm>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const router = useRouter();

  const submitCreateIssueForm = async (data: CreateIssueForm) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("Unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
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
          defaultValue={issue?.title}
          {...register("title", { required: true })}
        />
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        <Button type="submit" disabled={isSubmitting}>
          Submit Issue {isSubmitting && <LoadingSpinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
