import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import fetchAIResponse from "../../lib/mindb";
import { db } from "../../firebase";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { useFlow } from "../../context/FlowContext";


const InputBox = ({ setText, text }) => {
  const [loading, setIsLoading] = useState(false);
  const { currentUser } = useFlow();
  const sendMessage = async () => {
    try {
      if (text.trim() === "") return alert("input a message");

      setText("");
      // Add the new message to the Firestore collection
      const docRef = await addDoc(collection(db, "chatrooms"), {
        role: "user",
        message: text,
        userId: currentUser?.addr,
        created_at: serverTimestamp(), // Use serverTimestamp() to set the timestamp
      });
      const response = await fetchAIResponse(text);
      console.log(response)
      await addDoc(collection(db, "chatrooms"), {
        role: "ai",
        message: response,
        userId: currentUser?.addr,
        created_at: serverTimestamp(), // Use serverTimestamp() for the AI response as well
      });

      // Clear the input box
    } catch (error) {
      console.log("error sending message", error.message);
    }
  };
  return (
    <div className="flex items-center px-[21px] py-9 justify-around w-[60%] space-x-10 fixed bottom-0">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message"
        className="border-Grey w-full px-8 text-Black border rounded-[10px] h-[56px]"
      />
      <div
        onClick={sendMessage}
        className="bg-Accent w-[68px] h-[56px] flex items-center justify-center rounded-[10px]"
      >
        <PaperAirplaneIcon className="text-Black  w-[24px] h-[24px]" />
      </div>
    </div>
  );
};

export default InputBox;
