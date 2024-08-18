import React from "react";
import AdminHeader from "../../components/Layout/AdminHeader.js";
import AdminSideBar from "../../components/Admin/AdminSideBar";
import AllUser from "../../components/Admin/AllUser";

const AdminAllUserPage = () => {
  return (
    <div>
      <AdminHeader />

      <div className=" flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={4} />
        </div>
        <div className="w-[1500px] justify-center flex">
          <AllUser />
        </div>
      </div>
    </div>
  );
};

export default AdminAllUserPage;
