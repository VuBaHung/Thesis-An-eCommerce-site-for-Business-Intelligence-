import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsFillBagFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailOrder, setDetailOrder] = useState(null);
  const [rating, setRating] = useState(1);
  const { orders } = useSelector((state) => state.orders);
  const { token } = useSelector((state) => state.token);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    orders &&
      orders.map((order) => (order._id === id ? setDetailOrder(order) : null));
  }, [orders, id]);

  const productId = selectedItem && selectedItem._id;

  const reviewHandler = async () => {
    await axios
      .put(
        `${server}/product/update-product-review`,
        { user, comment, rating, productId, orderId: id },
        {
          headers: { Authorization: token },
        }
      )
      .then(
        (res) => toast.success("Review submitted successfully!"),
        setOpen(false)
      )
      .catch((err) => toast.error(err.response.data.msg));
  };

  const refundHandler = async () => {
    const status = "Processing refund";
    const orderId = id;
    await axios
      .put(
        `${server}/payment/refund-order`,
        { status, orderId },
        {
          headers: { Authorization: token },
          "Content-Type": "multipart/form-data",
        }
      )
      .then((res) => toast.success(res.data.msg), setOpen(false))
      .catch((err) => toast.error(err.response.data.msg));
  };

  return (
    <div className="py-6 px-10 min-h-screen bg-gray-50">
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-3 text-2xl font-semibold">Order Details</h1>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-gray-500">
          Order ID:{" "}
          <span className="font-medium">#{detailOrder?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-gray-500">
          Placed on:{" "}
          <span className="font-medium">
            {detailOrder?.createdAt?.slice(0, 10)}
          </span>
        </h5>
      </div>

      <div className="mt-6">
        {detailOrder &&
          detailOrder?.cart.map((item, index) => (
            <div
              className="w-full flex items-start mb-5 border-2 p-4 rounded-lg bg-white shadow-sm"
              key={index}
            >
              <img
                src={`${item.images[0]}`}
                alt=""
                className="h-32 w-32 object-contain"
              />
              <div className="w-full ml-4">
                <Link to={`/products/${item._id}`}>
                  <h5 className="text-xl font-semibold">{item.name}</h5>
                </Link>
                <h5 className="text-lg text-gray-700">
                  US${item.discountPrice} x {item.qty}
                </h5>
              </div>

              {detailOrder.status === "Delivered" ? (
                <div className="flex flex-col items-end ml-auto">
                  <h3 className="mt-4 text-red-500 font-semibold">
                    {detailOrder.status}
                  </h3>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
                    onClick={() => setOpen(true) || setSelectedItem(item)}
                  >
                    Write a review
                  </button>
                </div>
              ) : (
                <h3 className="mt-4 text-red-500 font-semibold ml-auto">
                  {detailOrder.status}
                </h3>
              )}
            </div>
          ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-end">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h2 className="text-2xl font-semibold text-center">
              Give a Review
            </h2>
            <div className="flex mt-6">
              <img
                src={`${selectedItem?.images[0]}`}
                alt=""
                className="h-24 w-24 object-contain"
              />
              <div className="ml-4">
                <div className="text-xl">{selectedItem?.name}</div>
                <h4 className="text-lg text-gray-700">
                  US${selectedItem?.discountPrice} x {selectedItem?.qty}
                </h4>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="text-xl font-semibold">
                Give a Rating <span className="text-red-500">*</span>
              </h5>
              <div className="flex mt-2">
                {[1, 2, 3, 4, 5].map((i) =>
                  rating >= i ? (
                    <AiFillStar
                      key={i}
                      className="mr-1 cursor-pointer"
                      color="rgb(246,186,0)"
                      size={25}
                      onClick={() => setRating(i)}
                    />
                  ) : (
                    <AiOutlineStar
                      key={i}
                      className="mr-1 cursor-pointer"
                      color="rgb(246,186,0)"
                      size={25}
                      onClick={() => setRating(i)}
                    />
                  )
                )}
              </div>
              <div className="mt-4">
                <label className="block text-lg font-semibold">
                  Write a comment
                  <span className="ml-1 text-gray-500">(optional)</span>
                </label>
                <textarea
                  name="comment"
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="How was your product? Write your expression about it!"
                  className="w-full mt-2 p-2 border rounded-md outline-none"
                ></textarea>
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                onClick={reviewHandler}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="border-t pt-4 text-right mt-6">
        <h5 className="text-lg">
          Total Price: <strong>US${detailOrder?.totalPrice}</strong>
        </h5>
      </div>

      <div className="mt-6 800px:flex items-center">
        <div className="w-full 800px:w-3/5">
          <h4 className="text-xl font-semibold">Shipping Address:</h4>
          <p className="text-lg mt-2">
            {detailOrder?.shippingAddress.address1}-
            <span>
              <p>
                {detailOrder?.shippingAddress.country}-
                {detailOrder?.shippingAddress.city}
              </p>
            </span>
          </p>
          <h4 className="text-lg font-semibold mt-4">Phone Number:</h4>
          <span>{detailOrder?.user?.phoneNumber}</span>
        </div>
        <div className="w-full 800px:w-2/5 mt-4 800px:mt-0">
          <h4 className="text-xl font-semibold">Payment Info:</h4>
          <p className="text-lg mt-2">
            Status:{" "}
            {detailOrder?.paymentInfo?.status
              ? detailOrder?.paymentInfo?.status
              : "Not Paid"}
          </p>
          {detailOrder?.status === "Delivered" && (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
              onClick={refundHandler}
            >
              Request Refund
            </button>
          )}
        </div>
      </div>
      <Link to="/" className="block mt-6">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Send Message
        </button>
      </Link>
    </div>
  );
};

export default OrderDetail;
