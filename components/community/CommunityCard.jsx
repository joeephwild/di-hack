import { UserIcon } from "@heroicons/react/solid";
import React from "react";


const CommunityCard = ({selectedCommunity}) => {
  return (
    <div className="bg-[#F4F5F6] w-[90%] h-[112px] py-[19px] px-[27px]">
      <div className="flex items-start">
        <div className="flex flex-col items-start">
          <h1 className="text-Black text-[28px] font-semibold">
            {selectedCommunity ? selectedCommunity.Name : "Default Name"}
          </h1>
          <div className="flex items-center justify-between w-full space-x-[16px]">
            <div>
              <p className="text-Grey w-[326px] text-[12px] font-medium">
                {selectedCommunity
                  ? selectedCommunity.description
                  : "Default Description"}
              </p>
            </div>
            <div className="flex items-center space-x-[9px]">
              <button className="text-Grey flex items-cente rounded-[10px]r bg-Grey/10 p-[9px]">
                <UserIcon className="text-Grey w-[20px] h-[20px]" />
                {selectedCommunity && selectedCommunity.Members
                  ? selectedCommunity.Members.length
                  : 0}{" "}
                members
              </button>
              <button className="text-Black flex items-center bg-Accent rounded-[10px] p-[9px]">
                Join Community
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center"></div>
      </div>
    </div>
  );
};

export default CommunityCard;
