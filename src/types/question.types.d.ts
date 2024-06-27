import {
  Question,
  User,
  Tag,
  UserUpvotesQuestion,
  UserAnswerQuestion,
} from "@prisma/client";

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
  userUpvotes: UserDownVoteQuestion[];
  userAnswers: UserAnswerQuestion[];
};
