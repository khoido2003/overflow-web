import { Question, User, Tag } from "@prisma/client";

export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author?: id;
}

export type GetQuestion = Question & {
  author: User;
  tagOnQuestion: {
    tag: Tag;
  }[];
};
