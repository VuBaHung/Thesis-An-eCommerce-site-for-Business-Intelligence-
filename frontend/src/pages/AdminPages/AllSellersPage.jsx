import React from "react";
import AdminHeader from "../../components/Layout/AdminHeader.js";
import AdminSideBar from "../../components/Admin/AdminSideBar";
import AllSeller from "../../components/Admin/AllSeller.js";

const AllSellersPage = () => {
  return (
    <div>
      <AdminHeader />

      <div className=" flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={3} />
        </div>
        <div className="w-[1500px] justify-center flex">
          <AllSeller />
        </div>
      </div>
    </div>
  );
};

export default AllSellersPage;
