import React, { Children, useEffect, useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { UserGroupIcon, PlusIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/solid";
import { CommunityCard, InputBox, Messages } from "../components/community";

const Communities = () => {
  const [community, setCommunity] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  console.log(selectedCommunity);
  useEffect(() => {
    const getAllCommunities = async () => {
      const q = query(collection(db, "community"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let communities = [];
        querySnapshot.forEach((doc) => {
          communities.push({ ...doc.data(), id: doc.id });
        });
        console.log(communities);
        setCommunity(communities);
        setSelectedCommunity(communities[0]);
        // Now you can use the 'communities' array or update your component state with it.
      });

      // Return a cleanup function to unsubscribe from the snapshot when the component unmounts.
      return () => unsubscribe();
    };

    getAllCommunities();
  }, []);

  const handleCommunitySelect = (communityDetail) => {
    setSelectedCommunity(communityDetail);
  };
  return (
    <div>
      <DefaultLayout>
        <Navbar />
        <div className="flex items-start w-full min-h-screen overflow-y-scroll">
          {/* Left Sidebar */}
          <div className="w-[8%] h-screen bg-[#F4F5F6] border-r border-[#E4E7EC] text-white p-4 flex flex-col items-center">
            <div className="bg-Grey mt-[73px] cursor-pointer w-[70px] h-[70px] rounded-full flex items-center justify-center">
              <UserGroupIcon className="text-Accent w-[32px] h-[32px]" />
            </div>
            <div className="flex flex-col items-center mt-9">
              {community.map((item, i) => (
                <div key={i} onClick={() => handleCommunitySelect(item)}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={230}
                    height={230}
                    className="rounded-[70px] cursor-pointer w-[70px] h-[70px]"
                  />
                </div>
              ))}
            </div>

            <div className="bg-Black mt-[73px] cursor-pointer w-[70px] h-[70px] rounded-full flex items-center justify-center">
              <PlusIcon className="text-Accent w-[32px] h-[32px]" />
            </div>
          </div>
          {/* Main Content */}
          <div className="w-[80%] h-screen px-[21px] pt-[25px]">
            <CommunityCard selectedCommunity={selectedCommunity} />
            <div className="border border-Accent px-9">
              <Messages selectedCommunity={selectedCommunity} />
            </div>

            <InputBox selectedCommunity={selectedCommunity} />
          </div>
          {/* Main Content ends */}
          <div className="w-[12%] flex flex-col items-center bg-Grey/10 h-screen">
            {selectedCommunity?.Members.map((item, i) => (
              <div key={i} className="mt-[41px]">
                <span className="text-Grey">Mentors</span>
                {item.role === "Mentor" && (
                  <div className="text-Black mt-4 flex items-center space-x-9">
                    <Image
                      src={item?.profile_image}
                      alt={item?.name}
                      width={230}
                      height={230}
                      className="w-[32px] h-[32px] object-cover rounded-[23px]"
                    />
                    <span>{item?.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default Communities;
