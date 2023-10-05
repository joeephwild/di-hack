import React, { useEffect, useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import { ChatCompoents, InputBox } from "../components/AiChat";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useFlow } from "../context/FlowContext";

const AiChat = () => {
  const [chatHistories, setChatHistories] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [text, setText] = useState("");
  const { currentUser } = useFlow();

  useEffect(() => {
    const fetchChat = async () => {
      if (currentUser?.addr) {
        const q = query(
          collection(db, "chatrooms"),
          where("userId", "==", currentUser.addr),
          orderBy("created_at")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let chat = [];
          querySnapshot.forEach((doc) => {
            chat.push({ ...doc.data(), id: doc.id });
          });
          setChatHistories(chat);
        });

        return () => {
          unsubscribe();
        };
      }
    };
    fetchChat();
  }, [currentUser]);

  return (
    <DefaultLayout>
      <Navbar />
      <div className="flex items-start">
        <div className="w-[80%] overflow-y-scroll scrollbar-hide text-Black m-[10px]">
          <span className="text-[28px] my-[31px] mx-[37px] text-Black">
            Learn with AI
          </span>
          <div className="flex-1 min-h-screen mt-[20px] scrollbar m-9">
            {chatHistories.map((item, i) => (
              <ChatCompoents key={i} {...item} />
            ))}
          </div>
          <InputBox text={text} setText={setText} />
        </div>
        <div className="w-[20%] bg-black h-screen"></div>
      </div>
    </DefaultLayout>
  );
};

export default AiChat;
