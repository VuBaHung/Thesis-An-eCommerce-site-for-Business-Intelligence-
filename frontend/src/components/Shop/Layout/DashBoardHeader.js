import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useSelector } from "react-redux";
import { server } from "../../../server";

const DashBoardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  // const a = useSelector((state) => state.seller[0]);
  console.log({ seller });
  return (
    <div className="w-full h-[80px] bg-white sha sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/dashboard">
          <img src="/ShopLogo.jpg" alt="" className="h-[90px] w-auto pl-10" />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/cuppouns" className="800px:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/dashboard-messages" className="800px:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={`/shop/${seller[0]._id}`}>
            <img
              src={`${seller[0]?.avatar}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover border-[1px] border-[#859484]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHeader;
