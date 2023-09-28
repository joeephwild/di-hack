import { ClockIcon, PlayIcon } from "@heroicons/react/solid";
import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {
  name: string;
  author: string;
  audio_file: string;
  image: StaticImageData;
  desc: string;
};

const PodcastCard = ({ audio_file, author, image, name, desc }: Props) => {
  return (
    <div className="bg-white cursor-pointer w-full py-4 px-4 shadow-md rounded-lg">
      <div className="flex items-center w-full">
        <div className="w-20 h-20">
          <Image src={image} alt={name} className="rounded-lg" />
        </div>
        <div className="ml-4 flex flex-col">
          <span className="text-lg font-medium text-black">{name}</span>
          <span className="text-sm font-normal w-[356px] text-gray-600">{desc}</span>
          <div className="flex items-center mt-2">
            <div className="flex items-center text-Orange">
              <ClockIcon className="w-4 h-4" />
              <span className="ml-1 font-medium">5:00</span>
            </div>
            <span className="ml-4 text-sm font-medium">
              Learn the perfect French accent
            </span>
          </div>
        </div>
        <button className="bg-black text-Accent flex items-center py-2 px-4 ml-auto rounded-lg">
          <span className="mr-2 text-[12px]">Play Now</span>
          <PlayIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PodcastCard;
