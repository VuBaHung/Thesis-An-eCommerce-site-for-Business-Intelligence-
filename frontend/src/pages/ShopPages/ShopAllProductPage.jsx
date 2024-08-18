import React, { useEffect, useState } from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader.js";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar.js";
import AllProducts from "../../components/Shop/AllProducts.js";
const ShopAllProductPage = () => {
  const [reload, setReload] = useState(false);

  useEffect(() => {}, [reload]);

  return (
    <div>
      <DashBoardHeader />

      <div className=" flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashBoardSideBar active={3} />
        </div>
        <div className="w-[1500px] justify-center flex">
          <AllProducts reload={reload} setReload={setReload} />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProductPage;
