import Link from "next/link";
import React from "react";
import { useFlow } from "../../context/FlowContext";
import { useRouter } from "next/router";

const IntroCard = () => {
  const { setActive } = useFlow();
  const route = useRouter();

  const handleRoute = () => {
    route.push("/aiTest");
    setActive("test");
  };
  return (
    <div className="bg-Grey/900 p-[40px] w-[700px] h-[150px] rounded-[8px]">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start space-y-[8px]">
          <h3 className="text-[16px] font-normal text-white">Hello OE</h3>
          <p className="w-[266px] text-[14px] text-Grey">
            Enhance your language skills in French by taking a quiz
          </p>
        </div>

        <button
          onClick={handleRoute}
          className="bg-Accent py-[10px] px-[24px] rounded-[8px]"
        >
          Start quiz
        </button>
      </div>
    </div>
  );
};

export default IntroCard;
