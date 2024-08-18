import React from "react";
import ShopPage from "../../components/Shop/ShopPage.js";
import styles from "../../styles/styles.js";
import ShopProfileData from "../../components/Shop/ShopProfileData.js";
import { useSelector } from "react-redux";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader.js";
import Header from "../../components/Layout/Header.js";
const ShopHomePage = () => {
  const { isSeller } = useSelector((state) => state.seller);
  return (
    <>
      {isSeller ? <DashBoardHeader /> : <Header />}
      <div className={`${styles.section} bg-[#f5f5f5]`}>
        <div className="w-full flex py-10 justify-between">
          <div className="w-[25%] bg-white rounded-[4px] shadow-sm overflow-y-scroll h-[100vh] sticky left-0 z-10">
            <ShopPage isOwner={isSeller} />
          </div>
          <div className="w-[72%] rounded-[4px]">
            <ShopProfileData isOwner={isSeller} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopHomePage;
