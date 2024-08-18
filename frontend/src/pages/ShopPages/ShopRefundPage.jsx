import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader.js";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar.js";
import Refund from "../../components/Shop/Refund.js";
const ShopRefundPage = () => {
  return (
    <div>
      <DashBoardHeader />

      <div className=" flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashBoardSideBar active={10} />
        </div>
        <div className="w-[1500px] justify-center flex">
          <Refund />
        </div>
      </div>
    </div>
  );
};

export default ShopRefundPage;
