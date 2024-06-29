import React from "react";
import StatsGroup from "./stats-group";

const ProfileStats = () => {
  return (
    <div className="my-5 flex flex-col gap-4">
      <h2 className="text-whitePrimary text-2xl font-semibold">Stats</h2>

      <StatsGroup />
    </div>
  );
};

export default ProfileStats;
