import Image from "next/image";
import React from "react";
import { robot } from "../../assets/images";

const LearnAiCard = () => {
  return (
    <div className="bg-Accent w-full py-[16px] px-[15px] rounded-[8px]">
      <div className="flex items-center justify-between w-full ">
        <div className="flex flex-col items-start space-y-[16px]">
          <span className="text-[20px] font-semibold text-Black">
            Learn faster with AI
          </span>
          <p className="text-[12px] text-Black font-normal w-[274px]">
            Enhance your language skills by learning a language with the help of
            AI
          </p>
        </div>
        <Image
          src={robot}
          alt="robot"
          className="w-[81.289px] h-[115.332px] object-contain"
        />
      </div>
      <button className="bg-Black w-full mt-[36px] items-center text-Accent py-[16px] rounded-[8px]">
        Get started
      </button>
    </div>
  );
};

export default LearnAiCard;
