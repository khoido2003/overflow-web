import { User } from "@prisma/client";

export type UserProfile = User & {
  _count: {
    questions: number;
    answerQuestions: number;
  };
};
