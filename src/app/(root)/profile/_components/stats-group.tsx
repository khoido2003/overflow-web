import React from "react";
import StatsCard from "./stats-card";
import Image from "next/image";

const StatsGroup = () => {
  return (
    <div className="flex w-full items-center justify-between gap-5">
      <StatsCard />
      <StatsCard />
      <StatsCard />
      <StatsCard />
    </div>
  );
};

export default StatsGroup;
