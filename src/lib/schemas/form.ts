import { z } from "zod";

// Validator

export const AskQuestionValiadator = z.object({
  title: z.string().min(5).max(130),
  content: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1),
});

export const AnswerQuestionValidator = z.object({
  content: z.string().min(10),
});

export const EditProfileValidator = z.object({
  name: z.string(),
  username: z.string().optional(),
  email: z.string().email(),
  bio: z.string().max(500).optional(),
  location: z.string().optional(),
  portfolioWebsite: z.string().url().optional(),
});

///////////////////////////

// Types

export type AskQuestionPayload = z.infer<typeof AskQuestionValiadator>;
export type AnswerQuestionPayload = z.infer<typeof AnswerQuestionValidator>;
export type EditProfilePayload = z.infer<typeof EditProfileValidator>;
