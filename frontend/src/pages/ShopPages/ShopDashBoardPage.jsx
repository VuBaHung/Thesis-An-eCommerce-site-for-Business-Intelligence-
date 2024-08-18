import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader.js";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar.js";
import DashBoardMain from "../../components/Shop/DashBoardMain.js";
const ShopDashBoardPage = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className=" flex items-start w-full">
        <div className="w-[330px]">
          <DashBoardSideBar active={1} />
        </div>
        <DashBoardMain />
      </div>
    </div>
  );
};

export default ShopDashBoardPage;
