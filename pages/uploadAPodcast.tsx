import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";

const UploadPodcast = () => {
  return (
    <DefaultLayout>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-start mt-[105px]">
          <span className="text-Black text-start text-[28px] font-normal">
            Upload a podcast
          </span>
          <form
            className="w-full mt-[45px] flex flex-col space-y-[24px]"
            action=""
          >
            <label className="flex flex-col items-start space-y-[8px]">
              <span className="text-Black text-[16px] font-normal">
                Preferred name
              </span>
              <input
                type="text"
                name=""
                id=""
                className="bg-Grey/50 border-Grey border w-full h-[45px]"
              />
            </label>
            <label className="flex flex-col items-start space-y-[8px]">
              <span className="text-Black text-[16px] font-normal">
                Language to mentor
              </span>
              <select className="bg-Grey/50 border-Grey border w-full h-[45px] text-Black">
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="English">English</option>
                <option value="Polish">Polish</option>
                <option value="Korean">Korean</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
              </select>
            </label>
            <label className="flex flex-col items-start space-y-[8px]">
              <span className="text-Black text-[16px] font-normal">
                Tell us about yourself
              </span>
              <textarea
                rows={25}
                cols={6}
                className="bg-Grey/50 border-Grey border w-full h-[45px]"
              />
            </label>
            <label className="flex flex-col items-start space-y-[8px]">
              <span className="text-Black text-[16px] font-normal">
                How long have you been speaking the chosen language
              </span>
              <input
                type="text"
                name=""
                id=""
                className="bg-Grey/50 border-Grey border w-full h-[45px]"
              />
            </label>
            <label className="flex flex-col items-start space-y-[8px]">
              <span className="text-Black text-[16px] font-normal">
                Your subscription charge
              </span>
              <input
                type="text"
                name=""
                id=""
                className="bg-Grey/50 border-Grey border w-full h-[45px]"
              />
            </label>
            <div className="flex items-center justify-center text-Black space-x-5">
              <input type="checkbox" />
              <span>I agree to Terms of Service and Privacy Policy</span>
            </div>
            <button className="bg-Accent w-full py-[16px] rounded-[8px]">
              Submit your application
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UploadPodcast;
