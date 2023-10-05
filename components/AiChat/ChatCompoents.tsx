import React from "react";
import { logo } from "../../assets/images";
import Image from "next/image";
import Avatar from "react-avatar";

const ChatCompoents = ({ role, message }) => {
  const isAI = role === "ai";

  const containerStyles = isAI
    ? "self-start bg-Black w-[449px] "
    : "self-end bg-Grey/20 w-[449px] ml-auto";

  const textStyles = isAI ? "text-white" : "text-Black";

  return (
    <div className="w-full">
      <div
        className={`flex ${containerStyles} flex flex-col py-[15px] px-[20px] space-y-3 rounded-[12px] mb-3`}
      >
        {isAI && (
          <Image
            src={logo}
            alt="logo"
            className="w-[32px] h-[32px] object-contain"
          />
        )}
        {!isAI && (
          <Avatar size="32px" className="object-contain rounded-full" />
        )}
        <p className={textStyles}>{message}</p>
      </div>
    </div>
  );
};

export default ChatCompoents;
