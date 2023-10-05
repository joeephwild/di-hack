import React, { useEffect, useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import { ChatCompoents, InputBox } from "../components/AiChat";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";

const AiChat = () => {
  const [chatHistories, setChatHistories] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [text, setText] = useState("");

  return (
    <DefaultLayout>
      <Navbar />
      <div className="flex items-start">
        <div className="w-[80%] text-Black m-[10px]">
          <span className="text-[28px] my-[31px] mx-[37px] text-Black">
            Learn with AI
          </span>
          <ChatCompoents />
          <InputBox text={text} setText={setText} />
        </div>
        <div className="w-[20%] bg-black h-screen"></div>
      </div>
    </DefaultLayout>
  );
};

export default AiChat;
