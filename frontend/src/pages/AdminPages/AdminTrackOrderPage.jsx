import React from "react";
import Header from "../../components/Layout/Header.js";
import Footer from "../../components/Layout/Footer.js";
import TrackOrder from "../../components/Profile/TrackOrder.js";

const AdminDashBoardPage = () => {
  return (
    <div>
      <Header />
      <TrackOrder />
      <Footer />
    </div>
  );
};

export default AdminDashBoardPage;
