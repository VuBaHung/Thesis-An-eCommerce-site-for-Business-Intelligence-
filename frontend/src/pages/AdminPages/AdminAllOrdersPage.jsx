import React from "react";
import AdminHeader from "../../components/Layout/AdminHeader.js";
import AdminSideBar from "../../components/Admin/AdminSideBar";
import AllOrderAdmin from "../../components/Admin/AllOrderAdmin";
const AdminAllOrdersPage = () => {
  return (
    <div>
      <AdminHeader />

      <div className=" flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={2} />
        </div>
        <div className="w-[1500px] justify-center flex">
          <AllOrderAdmin />
        </div>
      </div>
    </div>
  );
};

export default AdminAllOrdersPage;
