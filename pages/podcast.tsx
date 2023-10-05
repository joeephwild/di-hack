import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import PodcastCard from "../components/podcast/PodcastCard";
import { SearchIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

const Podcast = () => {
  const route = useRouter();
  return (
    <DefaultLayout>
      <Navbar />
      <div className="text-Black my-[41px] mx-[40px]">
        <span className="text-[24px] font-normal">Podcast</span>
        <div className="flex items-center justify-around space-x-9 w-full">
          <div className="flex bg-white border border-Grey p-5 items-start space-x-5 w-[90%]">
            <SearchIcon className="w-[24px] h-[24px] object-contain" />
            <input
              placeholder="Search podcasts"
              className="w-full border-none outline-none bg-transparent"
            />
          </div>
          <button
            onClick={() => route.push("/uploadAPodcast")}
            className="bg-Accent w-[10%] py-[10px] text-[14px] font-medium text-Black"
          >
            Upload Podcast
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-x-[33px] mt-[62px]">
          <PodcastCard />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Podcast;
