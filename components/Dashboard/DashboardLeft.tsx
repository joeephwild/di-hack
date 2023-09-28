import React, { useState } from "react";
import LearnAiCard from "./LearnAiCard";
import NfTBadge from "./NfTBadge";

const DashboardLeft = () => {
  const [badges, setBadges] = useState([1, 2, 3]);
  return (
    <div className="space-y-[53px]">
      <div className="flex flex-col space-y-[16px] items-start">
        <span>Your NFT Badges</span>
        <div className="flex items-center w-full gap-[33px]">
          {badges.slice(0, 3).map((item, i) => (
            <NfTBadge key={i} />
          ))}
        </div>
      </div>

      <LearnAiCard />
    </div>
  );
};

export default DashboardLeft;
