import { title } from "process";
import { z } from "zod";

// Validator

export const AskQuestionValiadator = z.object({
  title: z.string().min(5).max(130),
  content: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1),
});

export const AnswerQuestionValidator = z.object({
  content: z.string().min(50),
});

///////////////////////////

// Types

export type AskQuestionPayload = z.infer<typeof AskQuestionValiadator>;
export type AnswerQuestionPayload = z.infer<typeof AnswerQuestionValidator>;
