import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { loadUserOrders } from "../../redux/actions/order";

import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { MdTrackChanges } from "react-icons/md";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.orders);
  const { token } = useSelector((state) => state.token);
  const { user } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadUserOrders(token));
    checkStatus();
  }, []);
  const checkStatus = () => {
    [
      "Processing",
      "Transferred to delivery partner",
      "Shipping",
      "On the way",
      "Delivered",
    ].map((item, index) =>
      item === data?.status ? setActive(index + 1) : null
    );
  };
  console.log({ active });
  const data = orders && orders.find((item) => item._id === id);
  return (
    <div className={`py-4 min-h-[90vh]] ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <MdTrackChanges size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Track Order</h1>
        </div>
        <Link to="/profile">
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

      <div className="w-full flex justify-center pb-[10px]">
        <div className="w-full 800px:w-[80%] flex items-center flex-wrap justify-center">
          <div className={`${styles.noramlFlex}`}>
            <div className={`${styles.cart_button}`}>
              <span className={`${styles.cart_button_text}`}>1.Processing</span>
            </div>
            <div
              className={`${
                active > 1
                  ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                  : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
              }`}
            />
          </div>

          <div className={`${styles.noramlFlex}`}>
            <div
              className={`${
                active > 1
                  ? `${styles.cart_button}`
                  : `${styles.cart_button} !bg-[#FDE1E6]`
              }`}
            >
              <span
                className={`${
                  active > 1
                    ? `${styles.cart_button_text}`
                    : `${styles.cart_button_text} !text-[#f63b60]`
                }`}
              >
                2.Transferred to delivery partner
              </span>
            </div>
          </div>

          <div className={`${styles.noramlFlex}`}>
            <div
              className={`${
                active > 2
                  ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                  : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
              }`}
            />
            <div
              className={`${
                active > 2
                  ? `${styles.cart_button}`
                  : `${styles.cart_button} !bg-[#FDE1E6]`
              }`}
            >
              <span
                className={`${
                  active > 2
                    ? `${styles.cart_button_text}`
                    : `${styles.cart_button_text} !text-[#f63b60]`
                }`}
              >
                3.Shipping
              </span>
            </div>
          </div>
          <div className={`${styles.noramlFlex}`}>
            <div
              className={`${
                active > 3
                  ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                  : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
              }`}
            />
            <div
              className={`${
                active > 3
                  ? `${styles.cart_button}`
                  : `${styles.cart_button} !bg-[#FDE1E6]`
              }`}
            >
              <span
                className={`${
                  active > 3
                    ? `${styles.cart_button_text}`
                    : `${styles.cart_button_text} !text-[#f63b60]`
                }`}
              >
                4.On the way
              </span>
            </div>
          </div>
          <div className={`${styles.noramlFlex}`}>
            <div
              className={`${
                active > 4
                  ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                  : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
              }`}
            />
            <div
              className={`${
                active > 4
                  ? `${styles.cart_button}`
                  : `${styles.cart_button} !bg-[#FDE1E6]`
              }`}
            >
              <span
                className={`${
                  active > 4
                    ? `${styles.cart_button_text}`
                    : `${styles.cart_button_text} !text-[#f63b60]`
                }`}
              >
                5.Delivered
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">{data?.shippingAddress.address1}</h4>
          <h4 className=" text-[20px]">
            {data?.shippingAddress.country}-{data?.shippingAddress.city}
          </h4>
        </div>
        <div className="w-full 800px:w-[60%]">
          <h4 className=" text-[20px]">
            <span className="pt-3 text-[20px] font-[600]">Name: </span>
            {data?.user?.name}
          </h4>

          <h4 className=" text-[20px]">
            <span className="pt-3 text-[20px] font-[600]">Phone number: </span>
            {data?.user?.phoneNumber}
          </h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px] font-[600]">Payment Info:</h4>
          <h4>
            Type of Payment: {data?.paymentInfo ? data?.paymentInfo?.type : ""}
          </h4>
        </div>
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

      {/* ////// */}

      <div className="border-t w-full text-left">
        <h5 className="pt-3 text-[20px] text-[red]">
          Total Price: <strong>{data?.totalPrice} US$</strong>
        </h5>
      </div>
    </div>
  );
};

export default TrackOrder;
