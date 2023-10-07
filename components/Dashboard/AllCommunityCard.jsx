import { PlusCircleIcon } from "@heroicons/react/solid";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { korean } from "../../assets/images";


const AllCommunitiesCard = ({
  image,
  name,
}) => {
  return (
    <div className="bg-white cursor-pointer w-[256px] h-[112px] py-2 px-4 shadow-md rounded-lg">
      <div className="flex items-center w-full">
        <div className="w-[60px] h-[75px]">
          <Image src={image} alt={name} className="rounded-lg" />
        </div>
        <div className="flex flex-col pl-[8px] items-center">
          <div className="flex items-center">
            <span className="text-Black">The Koreos</span>
            <Image src={korean} alt="korean" className="w-[24px] h-[16px]" />
          </div>
          <span className="text-Grey">1507 members</span>
          <button className="bg-black text-Accent flex items-center py-2 px-4 ml-auto rounded-lg">
            <span className="mr-2 text-[12px]">Join community</span>
            <PlusCircleIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllCommunitiesCard;
