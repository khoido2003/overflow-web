import React from "react";

import { BadgeCounts, UserStats } from "@/types/user-profile.types";

import StatsCard from "./stats-card";

interface ProfileStatsProps {
  userStats: UserStats;
  badgeCounts: BadgeCounts;
}

const ProfileStats = ({ userStats, badgeCounts }: ProfileStatsProps) => {
  return (
    <div className="my-10 flex flex-col gap-2 lg:gap-4">
      <h2 className="text-profile-secondary">Stats</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
        <StatsCard
          questionCount={userStats.totalQuestions}
          answerCount={userStats.totalAnswers}
        />

        <StatsCard
          name="Gold Badge"
          badgeCount={badgeCounts.GOLD}
          icon="/assets/icons/gold-medal.svg"
          isBadge
        />
        <StatsCard
          name="Silver Badge"
          badgeCount={badgeCounts.SILVER}
          icon="/assets/icons/silver-medal.svg"
          isBadge
        />
        <StatsCard
          name="Bronze Badge"
          badgeCount={badgeCounts.BRONZE}
          icon="/assets/icons/bronze-medal.svg"
          isBadge
        />
      </div>
    </div>
  );
};

export default ProfileStats;
