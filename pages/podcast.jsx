import React, { useEffect } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import PodcastCard from "../components/podcast/PodcastCard";
import { SearchIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { config, send, decode } from "@onflow/fcl"

  const Podcast = () => {
    const route = useRouter();
    // useEffect(() => {
    //   async function fetchContractData() {
    //     //defining transaction
    //     const transaction = `
    //   transaction payForContent(contentId: UInt64, paymentAmount: UInt64) {
    //     prepare(acct: AuthAccount) {
    //         let contentContractRef = acct.borrow<&ContentContract.Collection>(from: /storage/ContentContractCollection)
    //             ?? panic("Missing or mis-typed ContentContract reference")
    
    //         // Pay for content using LancetToken
    //         contentContractRef.payForContent(contentId: contentId, paymentAmount: paymentAmount)
    //     }
    //     execute {
    //         log("Content purchased with LancetToken")
    //     }
    //   }`;
    //     const response = await send([
    //       () => transaction,
    //     ]);

    //     const data = await decode(response);

    //     console.log(data);

    //   }

    //   fetchContractData();

    // }, []);




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

