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
  author?: string;
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

export interface AnswerQuestionParams {
  content: string;
  author?: string;
  questionId?: string | number;
  createdAt?: Date;
}

export interface UpdateQuestionViews {
  id: string;
}

export interface GetTop5QuestionsParams {
  id: string;
  title: string;
  views: number;
  _count: {
    userUpvotes: number;
  };
}
