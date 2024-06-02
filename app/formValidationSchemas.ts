import z from "zod";

export const createIssueSchema = z.object({
  title: z
    .string()
    .min(3, "Title should be atleast 3 characters long")
    .max(100, "Title too long"),
  description: z
    .string()
    .min(0, "Please provide a description")
    .max(1000, "Description too long"),
});
