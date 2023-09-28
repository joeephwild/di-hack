import Image from "next/image";
import React, { useState } from "react";
import { logo } from "../assets/images";
import { SidebarTab } from "../utils";
import { useRouter } from "next/router";
import { useFlow } from "../context/FlowContext";

const Sidebar = () => {
  const { setActive, active } = useFlow();
  const route = useRouter();

  const handleRoute = (item: string, routePath: string) => {
    setActive(item);
    route.push(routePath);
  };
  return (
    <div className="w-[15%] h-screen bg-Black pt-[24px]">
      <div className="flex items-center space-x-[9px]  px-[24px]">
        <Image
          src={logo}
          alt="logo"
          className="w-[44px] h-[44px] object-contain"
        />
        <h3 className="text-[24px] text-[#fff] font-bold">Lacent</h3>
      </div>

      <div className="flex flex-col space-y-[14px] items-center py-[54px]">
        {SidebarTab.map((item, i) => (
          <div
            onClick={() => handleRoute(item.active, item.route)}
            key={i}
            className={`${
              active === item.active && "bg-Shade/White/40 "
            } w-full px-[24px] py-[12px] flex items-center space-x-[12px] cursor-pointer`}
          >
            <item.icons
              color="white"
              fontSize={20}
              // color={active === item.active ? "#30F2A1" : "#98A2B3"}
              className={`${
                active === item.active ? "text-Accent" : "text-Grey"
              } h-[20px] w-[20px] object-contain`}
            />
            <span
              className={`${
                active === item.active ? "text-[#fff]" : "text-Grey"
              }`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
