import React, { useCallback, useEffect, useState } from "react";
import ShopPage from "../../components/Shop/ShopPage.js";
import styles from "../../styles/styles.js";
import ShopProfileData from "../../components/Shop/ShopProfileData.js";
import { useSelector } from "react-redux";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader.js";
import Header from "../../components/Layout/Header.js";
import { useParams } from "react-router-dom";
import axios from "axios";
const SellerDetails = () => {
  const [seller, setSeller] = useState();
  const id = useParams();
  useCallback(
    async function getData() {
      await axios
        .get(`/shop-infor/${id}`)
        .then((res, err) => {
          setSeller(res.data.seller);
        })
        .catch((err) => console.log(err));
    },
    [id]
  );
  return (
    <>
      {seller ? <DashBoardHeader /> : <Header />}
      <div className={`${styles.section} bg-[#f5f5f5]`}>
        <div className="w-full flex py-10 justify-between">
          <div className="w-[25%] bg-white rounded-[4px] shadow-sm overflow-y-scroll h-[100vh] sticky left-0 z-10">
            <ShopPage isOwner={seller} />
          </div>
          <div className="w-[72%] rounded-[4px]">
            <ShopProfileData isOwner={seller} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerDetails;
