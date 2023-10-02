import Image from "next/image";
import React from "react";

type Props = {
  selectedCommunity: any;
};

const Messages = ({ selectedCommunity }: Props) => {
  return (
    <div className="w-full h-screen overflow-y-scroll">
      <div className="">
        <span>Messages</span>
      </div>
      <div className="flex flex-col gap-6">
        {selectedCommunity?.Messages.map((item: any, i: any) => (
          <div key={i}>
            <div className="flex items-start space-x-2">
              <Image
                src={item?.profile_image}
                alt={item?.profile_name}
                width={20}
                height={20}
                className="w-[38px] h-[38px] rounded-[38px] object-cover"
              />
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
