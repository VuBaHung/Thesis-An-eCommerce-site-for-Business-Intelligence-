import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader.js";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar.js";
import WithDrawMoney from "../../components/Shop/WithDrawMoney.js";
const ShopWithdrawMoneyPage = () => {
  return (
    <div>
      <DashBoardHeader />

      <div className=" flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashBoardSideBar active={7} />
        </div>
        <div className="w-[1500px] justify-center flex">
          <WithDrawMoney />
        </div>
      </div>
    </div>
  );
};

export default ShopWithdrawMoneyPage;
