import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { loadShopOrders } from "../../redux/actions/order";

const ShopOrderDetail = () => {
  const { shopOrders, isLoading } = useSelector((state) => state.orders);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(loadShopOrders(seller[1]));
  }, [dispatch]);

  const data = shopOrders && shopOrders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/payment/update-order-status/${id}`,
        {
          status,
        },
        {
          headers: { Authorization: seller[1] },
        }
      )
      .then((res) => {
        toast.success("Order updated!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/payment/update-refund-order/${id}`,
        {
          status,
        },
        {
          headers: { Authorization: seller[1] },
        }
      )
      .then((res) => {
        toast.success("Order updated!");
        dispatch(loadShopOrders(seller[1]));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(status);

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            Order List
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5" key={index}>
            <img
              src={`${item.images[0]}`}
              alt=""
              className="h-[170px] w-[170px] object-contain"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                US${item.discountPrice} x {item.qty}
              </h5>
            </div>
          </div>
        ))}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="text-[20px]">
            {data?.shippingAddress.address1}-{data?.shippingAddress.country}-
            {data?.shippingAddress.city}
          </h4>
          {console.log(data.user)}
          <h4 className=" pt-3 text-[20px] font-[600]">Phone Number:</h4>
          <h4 className=" text-[20px]">
            {data?.user?.phoneNumber || `0337172521`}
          </h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px] ">Payment Info:</h4>
          <h4>Status: {data ? data.status : "Not Paid"}</h4>
          <h4>
            Type of Payment: {data?.paymentInfo ? data?.paymentInfo?.type : ""}
          </h4>
        </div>
      </div>
      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">
        {data?.status === "Processing refund" ||
        data?.status === "Refund Success"
          ? "Refund Status:"
          : "Order Status:"}
      </h4>
      {data?.status !== "Processing refund" &&
        data?.status !== "Refund Success" && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {[
              "Processing",
              "Transferred to delivery partner",
              "Shipping",
              "On the way",
              "Delivered",
            ]
              .slice(
                [
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "On the way",
                  "Delivered",
                ].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        )}
      {data?.status === "Processing refund" ||
      data?.status === "Refund Success" ? (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
        >
          {["Processing refund", "Refund Success"]
            .slice(
              ["Processing refund", "Refund Success"].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      ) : null}

      <div
        className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px] text-center`}
        onClick={
          data?.status === "Processing refund" ||
          data?.status === "Refund Success"
            ? refundOrderUpdateHandler
            : orderUpdateHandler
        }
      >
        {data?.status === "Processing refund" ||
        data?.status === "Refund Success"
          ? "Update Refund Status:"
          : "Update Status:"}
      </div>
    </div>
  );
};

export default ShopOrderDetail;
