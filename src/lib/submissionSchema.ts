import { z } from "zod";

export const submissionSchema = z.object({
  name: z.string().trim().min(2).max(200),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(6)
    .max(30)
    .regex(/^[0-9+()\-\s]+$/),
  email: z.email().max(200),
  category: z
    .enum(["business", "medicine", "education", "government", "other"])
    .optional()
    .or(z.literal("")),
  problemDescription: z.string().trim().min(10).max(5000),
  proposedSolution: z.string().trim().max(5000).optional().or(z.literal("")),
  language: z.enum(["ru", "kz"]),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type SubmissionFormValues = z.infer<typeof submissionSchema>;
