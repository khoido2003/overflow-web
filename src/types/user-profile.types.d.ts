import { BADGE_CRITERIA } from "@/constants";
import { User } from "@prisma/client";

export type UserProfile = User & {
  _count: {
    questions: number;
    answerQuestions: number;
  };
};

export type UserStats = {
  totalQuestions: number;
  totalAnswers: number;
  totalQuestionsUpvote: number;
  totalAnswersUpvote: number;
  totalViews: number;
};

export interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;
