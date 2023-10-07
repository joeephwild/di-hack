import React, { useState } from "react";
import { useFlow } from "../context/FlowContext";
import { useRouter } from "next/router";
import { XIcon } from "@heroicons/react/solid";
import { useUser } from "../context/UserContext";

const ConnectModal = () => {
  const { setModalOpen, logIn, currentUser } = useFlow();
  const { checkIfUserExist } = useUser();
  const [email, setEmail] = useState("");
  const route = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white py-[27px] px-[24px] rounded-lg shadow-lg w-[434px] h-[352px]">
        <div className="flex items-center justify-between w-full mb-9">
          <h2 className="text-[22px] font-semibold text-black">
            Connect wallet
          </h2>
          <button onClick={() => setModalOpen(false)} className="bg-[#C0C0CF]">
            <XIcon className="w-[20px] h-[20px] bg-Grey/20 text-white " />
          </button>
        </div>
        <p className="text-gray-700">
          To receive a one-time magic link and connect your wallet, please
          provide your email address below.
        </p>
        <form className="mt-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full h-12 px-3 text-black border border-gray-300 rounded-lg"
          />
        </form>
        <div className="mt-6">
          <button
            // onClick={handleLogIn}
            className="bg-Accent text-white w-full rounded-lg py-3"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
