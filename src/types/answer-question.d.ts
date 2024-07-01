import {
  UserAnswerQuestion,
  User,
  UserAnswerQuestionDownvotes,
  UserAnswerQuestionUpvotes,
} from "@prisma/client";

export type GetAllAnswers = UserAnswerQuestion & {
  user: User;
  questionDownvotes: UserAnswerQuestionDownvotes[];
  questionUpvotes: UserAnswerQuestionUpvotes[];
};
