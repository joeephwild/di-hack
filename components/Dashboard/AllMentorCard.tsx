import React from "react";
import { mentors } from "../../utils";
import Image from "next/image";

const AllMentorCard = () => {
  return (
    <div className="flex items-center gap-[20px] w-[700px] bg-white py-[34px] px-[18.89px]">
      {mentors.slice(0, 6).map((item, i) => (
        <div key={i} className="flex flex-col items-center w-full">
          <Image
            src={item.image}
            alt={item.name}
            className="w-[48px] h-[48px]"
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default AllMentorCard;
