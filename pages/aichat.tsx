import React, { useEffect, useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import { ChatCompoents } from "../components/AiChat";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";

const AiChat = () => {
  const [chatHistories, setChatHistories] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  console.log(selectedCommunity);
  useEffect(() => {
    const getAllCommunities = async () => {
      const q = query(collection(db, "chat"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let chatHistory = [];
        querySnapshot.forEach((doc) => {
          chatHistory.push({ ...doc.data(), id: doc.id });
        });
        console.log(chatHistory);
        setChatHistories(chatHistory);
        setSelectedCommunity(chatHistory[0]);
        // Now you can use the 'chatHistory' array or update your component state with it.
      });

      // Return a cleanup function to unsubscribe from the snapshot when the component unmounts.
      return () => unsubscribe();
    };

    getAllCommunities();
  }, []);
  return (
    <DefaultLayout>
      <Navbar />
      <div className="flex items-start">
        <div className="w-[80%] text-Black m-[10px]">
          <span>Learn with AI</span>
          <ChatCompoents />
        </div>
        <div className="w-[20%] bg-black h-screen"></div>
      </div>
    </DefaultLayout>
  );
};

export default AiChat;
