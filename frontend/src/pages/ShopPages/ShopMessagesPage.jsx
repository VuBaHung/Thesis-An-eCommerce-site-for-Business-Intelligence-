import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader.js";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar.js";
import ShopMessages from "../../components/Shop/ShopMessages.js";
const ShopMessagesPage = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className=" flex items-start w-full">
        <div className="w-[330px]">
          <DashBoardSideBar active={8} />
        </div>
        <ShopMessages />
      </div>
    </div>
  );
};

export default ShopMessagesPage;
