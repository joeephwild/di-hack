import React from "react";
import { mentors } from "../../utils";
import Image from "next/image";
import Avatar from "react-avatar";

const AllMentorCard = () => {
  return (
    <div className="flex items-center gap-[20px] w-[700px] bg-white py-[34px] px-[18.89px]">
      {mentors.slice(0, 6).map((item, i) => (
        <div key={i} className="flex flex-col items-center w-full">
          <Avatar className="rounded-full w-[28px] h-[28px]" size="58px" name={item.name} />
          <span className="text-Black">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default AllMentorCard;
