import {
  Question,
  User,
  Tag,
  UserUpvotesQuestion,
  UserAnswerQuestion,
  UserDownVoteQuestion,
  UserSavedQuestion,
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
  userUpvotes: UserUpvotesQuestion[];
  userDownvotes: UserDownVoteQuestion[];
  userAnswers: UserAnswerQuestion[];
  userSavedQuestion: UserSavedQuestion[];
};
