import React from "react";
import StatsCard from "./stats-card";
import { UserProfile } from "@/types/user-profile.types";

const ProfileStats = ({ user }: { user: UserProfile }) => {
  return (
    <div className="my-10 flex flex-col gap-2 lg:gap-4">
      <h2 className="text-profile-secondary">Stats</h2>

      <div className="flex flex-col items-stretch justify-between gap-5 md:flex-row lg:gap-5">
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
