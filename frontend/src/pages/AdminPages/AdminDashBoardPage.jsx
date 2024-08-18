import React from "react";
import AdminHeader from "../../components/Layout/AdminHeader.js";
import AdminSideBar from "../../components/Admin/AdminSideBar.js";
import AdminDashBoardMain from "../../components/Admin/AdminDashBoardMain.js";
const AdminDashBoardPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[200px] 800px:w-[330px]">
            <AdminSideBar active={1} />
          </div>
          <AdminDashBoardMain />
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoardPage;
