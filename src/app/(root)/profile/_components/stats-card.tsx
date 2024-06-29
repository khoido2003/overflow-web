import Image from "next/image";
import React from "react";

const StatsCard = () => {
  return (
    <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#151821] bg-[#0F1117] px-8 py-4">
      <Image
        src="/assets/icons/gold-medal.svg"
        alt="test"
        width={50}
        height={50}
      />
      <div>
        <p className="text-xl font-semibold">15</p>
        <p className="text-sm font-normal text-[#DCE3F1]">Gold Badges</p>
      </div>
    </div>
  );
};

export default StatsCard;
