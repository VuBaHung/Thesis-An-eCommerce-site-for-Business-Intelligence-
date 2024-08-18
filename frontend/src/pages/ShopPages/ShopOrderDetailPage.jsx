import React from "react";

import Footer from "../../components/Layout/Footer.js";
import ShopOrdersDetail from "../../components/Shop/ShopOrdersDetail.js";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader.js";

const ShopOrderDetailPage = () => {
  return (
    <div>
      <DashBoardHeader />
      <ShopOrdersDetail />
    </div>
  );
};

export default ShopOrderDetailPage;
