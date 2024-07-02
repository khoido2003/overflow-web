import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { assignBadges } from "@/lib/utils";
import { BadgeCriteriaType } from "@/types/user-profile.types";
import { User } from "@prisma/client";

export async function getUserInfo(userId: string) {
  const userRes = await fetch(`${API_REQUEST_PREFIX}/users/${userId}`);

  if (!userRes) {
    throw new Error("User not found");
  }

  const userData = await userRes.json();

  const userStatsRes = await fetch(`${API_REQUEST_PREFIX}/users/stats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  const userStatsData = await userStatsRes.json();

  const criteria = [
    {
      type: "QUESTION_COUNT" as BadgeCriteriaType,
      count: userStatsData.data.totalQuestions,
    },
    {
      type: "ANSWER_COUNT" as BadgeCriteriaType,
      count: userStatsData.data.totalAnswers,
    },
    {
      type: "QUESTION_UPVOTES" as BadgeCriteriaType,
      count: userStatsData.data.totalQuestionsUpvote,
    },
    {
      type: "ANSWER_UPVOTES" as BadgeCriteriaType,
      count: userStatsData.data.totalAnswersUpvote,
    },
    {
      type: "TOTAL_VIEWS" as BadgeCriteriaType,
      count: userStatsData.data.totalViews,
    },
  ];

  const badgeCounts = assignBadges({ criteria });

  return {
    userInfo: userData.data as User,
    userStats: userStatsData.data,
    badgeCounts,
  };
}
