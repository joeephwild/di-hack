import React from "react";
import IntroCard from "./IntroCard";
import { ChevronRightIcon } from "@heroicons/react/solid";
import AllMentorCard from "./AllMentorCard";
import PodcastCard from "./PodcastCard";
import { Podcast } from "../../utils";
import AllCommunitiesCard from "./AllCommunityCard";

const DahboardRight = () => {
  return (
    <>
      <span className="text-[28px] text-Grey/900">Dashboard</span>
      <IntroCard />
      {/** mentors section */}
      <div className="flex flex-col w-[700px] space-y-[24px]">
        <div className="flex mt-6 items-center justify-between">
          <div className="flex flex-col items-start">
            <h3 className="text-[16px] font-medium text-Black">
              Available mentors
            </h3>
            <p className="text-[14px] font-normal text-Grey">
              Book a language mentor to fast track your learning
            </p>
          </div>
          <div className="flex  items-center space-x-[9px]">
            <span>See all mentors</span>
            <ChevronRightIcon className="w-[16px] h-[16px] object-contain" />
          </div>
        </div>
        <AllMentorCard />
      </div>
      {/** mentors section end */}

      {/** podcast section */}
      <div className="flex flex-col w-[700px] space-y-[24px]">
        <div className="flex mt-6 items-center justify-between">
          <div className="flex flex-col items-start">
            <h3 className="text-[16px] font-medium text-Black">
              Trending podcasts
            </h3>
            <p className="text-[14px] font-normal text-Grey">
              Improve your listening skills with recommended podcasts
            </p>
          </div>
          <div className="flex  items-center space-x-[9px]">
            <span>See all podcasts</span>
            <ChevronRightIcon className="w-[16px] h-[16px] object-contain" />
          </div>
        </div>
        <div className="flex flex-col items-center space-y-[24px]">
          {Podcast.slice(0, 3).map((item, i) => (
            <PodcastCard key={i} {...item} />
          ))}
        </div>
      </div>
      {/** podcast section end */}

      {/** Communities section */}
      <div className="flex flex-col w-[700px] space-y-[24px]">
        <div className="flex mt-6 items-center justify-between">
          <div className="flex flex-col items-start">
            <h3 className="text-[16px] font-medium text-Black">
              Top communities
            </h3>
            <p className="text-[14px] font-normal text-Grey">
              Join a community to meet fellow speakers
            </p>
          </div>
          <div className="flex  items-center space-x-[9px]">
            <span>See all communities</span>
            <ChevronRightIcon className="w-[16px] h-[16px] object-contain" />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center space-y-[24px]">
          {Podcast.slice(0, 4).map((item, i) => (
            <AllCommunitiesCard key={i} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DahboardRight;
