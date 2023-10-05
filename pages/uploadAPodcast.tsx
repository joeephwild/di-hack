import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { useContract } from "../context/ContractProvider";

const UploadPodcast = () => {
  const { uploadAPodcast } = useContract();
  return (
    <DefaultLayout>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-start mt-[105px]">
          <span className="text-Black text-start text-[28px] font-normal">
            Upload a podcast
          </span>
          <form
            onSubmit={() => uploadAPodcast()}
            className="w-full mt-[45px] flex flex-col space-y-[24px]"
            action=""
          >
            <label className="flex flex-col items-start space-y-[8px]">
              <span className="text-Black text-[16px] font-normal">Title</span>
              <input
                type="text"
                name=""
                id=""
                className="bg-Grey/50 text-Black px-3 border-Grey border w-full h-[45px]"
              />
            </label>
            <label className="flex flex-col items-start space-y-[8px]">
              <span className="text-Black text-[16px] font-normal">
                Description
              </span>
              <textarea
                rows={25}
                cols={6}
                className="bg-Grey/50 border-Grey px-3 text-Black border w-full h-[45px]"
              />
            </label>
            <div className="border border-Grey p-6 flex items-center justify-center ">
              <button className="bg-Accent/10 text-Accent items-center p-3 rounded-[10px]">
                Upload File
              </button>
            </div>
            <div className="flex items-center justify-center text-Black space-x-5">
              <input type="checkbox" />
              <span>I agree to Terms of Service and Privacy Policy</span>
            </div>
            <button
              onClick={uploadAPodcast}
              className="bg-Accent w-full py-[16px] rounded-[8px]"
            >
              Upload Podcast
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UploadPodcast;
