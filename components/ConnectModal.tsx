import React, { useState } from "react";
import { useFlow } from "../context/FlowContext";

const ConnectModal = () => {
  const { setModalOpen, logIn } = useFlow();
  const [email, setEmail] = useState("");

  const handleLogIn = async () => {
    const res = logIn(email);
    if (res) {
      setModalOpen(false);
    }
  };
  return (
    <div className="fixed bg-Black/50 inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-[24px] rounded-lg shadow-lg w-[434px] h-[352px]">
        <h2 className="text-2xl font-semibold mb-4">Connect wallet</h2>
        <p className="text-gray-700">
          To receive a one-time magic link and connect your wallet, please
          provide your email address below
        </p>
        <form action="" className="mt-[27px]">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full h-[51px] px-4 border-white"
          />
        </form>
        <div className="mt-[31px]">
          <button
            onClick={handleLogIn}
            className="bg-Accent w-full text-gray-800 rounded-lg py-[15px]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
