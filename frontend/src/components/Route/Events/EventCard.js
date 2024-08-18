import React from "react";
import styles from "../../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const EventCard = ({ data, active }) => {
  return data === undefined ? (
    <div>There are no event now!</div>
  ) : (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2 `}
    >
      <div className="w-full lg:-w[50%] m-auto">
        <img
          src={data?.images}
          alt=""
          className="w-[600px] h-[400px] object-contain"
        ></img>
      </div>

      <div className="w-full lg:[w-50%] flex flex-col justify-center ">
        <h2 className={`${styles.productTitle} pb-[10px]`}>{data?.name}</h2>
        <Link to={`/shop/preview/${data?.shopId}`}>
          <h5 className={`${styles.shop_name} font-bold pb-[20px] `}>
            {data.shop.name}
          </h5>
        </Link>
        <p className="pr-[50px]">{data?.description}</p>
        <div className="flex py-5 justify-between pr-[30px]">
          <div className="flex ">
            <h4 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice}$
            </h4>
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice}$
            </h5>
          </div>
          <span className="pr-10 font-[400] text-[17px] text-[#44a55e]">
            sold: {data?.sold_out}
          </span>
        </div>
        <CountDown startDate={data?.startDate} endDate={data?.endDate} />{" "}
        {active ? (
          <Link to={"/events"}>
            <div className="items-end justify-end text-end flex text-[#2e636b] font-bold">
              More events
              <AiOutlineArrowRight className="pb-[5px]" size={20} />
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default EventCard;
