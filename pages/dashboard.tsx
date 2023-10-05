import React from "react";
import { DahboardRight, DashboardLeft } from "../components/Dashboard";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";

const dashboard = () => {
  return (
    <DefaultLayout>
      <Navbar />
      <div className="flex items-start w-full h-screen overflow-y-scroll gap-5">
        <div className="w-[60%] h-screen overflow-y-scroll pt-[41px] pb-[50px] px-[40px]">
          <DahboardRight />
        </div>
        <div className="w-[40%] h-screen overflow-y-scroll pt-[41px] pb-[50px] px-[40px]">
          <DashboardLeft />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default dashboard;
