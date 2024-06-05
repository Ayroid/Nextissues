import z from "zod";

const issueSchema = z.object({
  title: z
    .string()
    .min(3, "Title should be atleast 3 characters long")
    .max(100, "Title too long"),
  description: z
    .string()
    .min(0, "Please provide a description")
    .max(1000, "Description too long"),
});

const patchIssueSchema = z.object({
  title: z
    .string()
    .min(3, "Title should be atleast 3 characters long")
    .max(100, "Title too long")
    .optional(),
  description: z
    .string()
    .min(0, "Please provide a description")
    .max(1000, "Description too long")
    .optional(),
  assignedToUserId: z
    .string()
    .min(3, "AssignedToUserID is required")
    .max(100, "AssignedToUserID too long")
    .optional()
    .nullable(),
});

export { issueSchema, patchIssueSchema };
