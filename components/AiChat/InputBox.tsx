import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { mindDbQueryCall } from "../../lib/mindb";
import { db } from "../../firebase";
import { PaperAirplaneIcon } from "@heroicons/react/solid";

type Props = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

const InputBox = ({ setText, text }: Props) => {
  const [loading, setIsLoading] = useState(false);
  const sendMessage = async () => {
    try {
      if (text.trim() === "") return alert("input a message");

      setText("");
      // Add the new message to the Firestore collection
      const docRef = await addDoc(collection(db, "chatrooms"), {
        role: "user",
        message: text,
        userId: "",
        created_at: serverTimestamp(), // Use serverTimestamp() to set the timestamp
      });

      //   setAiLoading(true);
      //   setIscurrentMessages(true);
      const response = await mindDbQueryCall("joseph", text);
      //   setAiLoading(false);
      //   setIscurrentMessages(false);
      await addDoc(collection(db, "chatrooms"), {
        role: "ai",
        message: response,
        userId: "",
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
