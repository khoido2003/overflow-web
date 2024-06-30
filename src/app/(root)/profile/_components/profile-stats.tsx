import React from "react";
import StatsCard from "./stats-card";
import { UserProfile } from "@/types/user-profile.types";

const ProfileStats = ({ user }: { user: UserProfile }) => {
  return (
    <div className="my-5 flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-whitePrimary">Stats</h2>

      <div className="flex w-full flex-wrap items-stretch justify-between gap-5">
        <StatsCard
          questionCount={
            user._count.questions > 999 ? "999+" : user._count.questions
          }
          answerCount={
            user._count.answerQuestions > 999
              ? "999+"
              : user._count.answerQuestions
          }
        />

        <StatsCard
          name="Gold Badge"
          badgeCount={200}
          icon="/assets/icons/gold-medal.svg"
          isBadge
        />
        <StatsCard
          name="Silver Badge"
          badgeCount={19}
          icon="/assets/icons/silver-medal.svg"
          isBadge
        />
        <StatsCard
          name="Bronze Badge"
          badgeCount={123}
          icon="/assets/icons/bronze-medal.svg"
          isBadge
        />
      </div>
    </div>
  );
};

export default ProfileStats;
