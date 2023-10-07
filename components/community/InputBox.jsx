import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useFlow } from "../../context/FlowContext";

const InputBox = ({selectedCommunity}) => {
  const { currentUser } = useFlow();
  const [message, setMessage] = useState("");
  const sendAMessage = async (communityId) => {
    if (message.trim() === "") return alert("Enter a message");

    try {
      // Create a reference to the specific community
      const communityRef = doc(db, "community", communityId);

      // Get the existing messages from the community (if any)
      const communityDoc = await getDoc(communityRef);
      const existingMessages = communityDoc.data().Messages || [];

      // Add the new message to the existing messages
      const newMessage = {
        content: message,
        created_at: new Date().toISOString(),
        profile_name: currentUser.email,
        profile_image:
          "https://images.pexels.com/photos/3851879/pexels-photo-3851879.jpeg?auto=compress&cs=tinysrgb&w=1600",
      };

      existingMessages.push(newMessage);

      // Update the community document with the new messages
      await updateDoc(communityRef, {
        Messages: existingMessages,
      });

      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="flex items-center px-[21px] py-9 justify-around w-[60%] space-x-10 fixed bottom-0">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        className="border-Grey w-full px-8 text-Black border rounded-[10px] h-[56px]"
      />
      <div
        onClick={() => sendAMessage(selectedCommunity?.id)}
        className="bg-Accent w-[68px] h-[56px] flex items-center justify-center rounded-[10px]"
      >
        <PaperAirplaneIcon className="text-Black  w-[24px] h-[24px]" />
      </div>
    </div>
  );
};

export default InputBox;
