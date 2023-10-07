import Image from "next/image";
import React from "react";
import Avatar from "react-avatar";

const Messages = ({selectedCommunity}) => {
  return (
    <div className="w-full h-screen overflow-y-scroll">
      <div className="">
        <span>Messages</span>
      </div>
      <div className="flex flex-col gap-6">
        {selectedCommunity?.Messages.map((item, i) => (
          <div key={i}>
            <div className="flex items-start space-x-2">
              <Avatar name={item?.profile_name} className="rounded-full" size="38px" />
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <span className="text-Black">{item?.profile_name}</span>
                  <span className="text-Grey">{item?.created_at?.seconds}</span>
                </div>
                <span className="text-Black">{item?.content}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
