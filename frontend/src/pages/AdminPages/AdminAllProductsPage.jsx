import React from "react";
import AdminHeader from "../../components/Layout/AdminHeader.js";
import AdminSideBar from "../../components/Admin/AdminSideBar";
import AllProductsAdmin from "../../components/Admin/AllProductsAdmin.js";

const AdminAllProductsPage = () => {
  return (
    <div>
      <AdminHeader />

      <div className=" flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={5} />
        </div>
        <div className="w-[1500px] justify-center flex">
          <AllProductsAdmin />
        </div>
      </div>
    </div>
  );
};

export default AdminAllProductsPage;
