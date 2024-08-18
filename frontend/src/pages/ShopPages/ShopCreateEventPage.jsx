import React from "react";
import CreateEvent from "../../components/Shop/CreateEvent";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";

const ShopCreateEventPage = () => {
  return (
    <div>
      <DashBoardHeader />

      <div className=" flex items-center justify-between w-full">
        <div className="w-[330px]">
          <DashBoardSideBar active={6} />
        </div>
        <div className="w-full justify-center justify-items-center flex">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateEventPage;
