import React from "react";
import AllOrders from "../../components/Shop/AllOrders";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import OrderChart from "../../components/Shop/OrderChart";

const ShopAllOrdersPage = () => {
  return (
    <div>
      <DashBoardHeader />

      <div className=" flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashBoardSideBar active={2} />
        </div>
        <div>
          <div className="w-[1500px] justify-center flex">
            <AllOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrdersPage;
