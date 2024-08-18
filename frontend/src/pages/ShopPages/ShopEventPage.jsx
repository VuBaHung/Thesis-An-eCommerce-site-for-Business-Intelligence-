import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader.js";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar.js";

import ShopAllEvent from "../../components/Shop/ShopAllEvent.js";
const ShopEventPage = () => {
  return (
    <div>
      <DashBoardHeader />

      <div className=" flex justify-between w-full">
        <div className="w-[330px]">
          <DashBoardSideBar active={5} />
        </div>
        <div className="w-[1500px] justify-center flex">
          <ShopAllEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopEventPage;
