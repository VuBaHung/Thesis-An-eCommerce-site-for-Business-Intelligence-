import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";
import Ratings from "./Rating";
import axios from "axios";
import { server } from "../../server";
const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const { products, isLoading } = useSelector((state) => state.product);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  useCallback(() => {
    dispatch(getAllProductsShop(data && data[0].shopId));
  }, [dispatch, data]);
  const dataArr = Object.values(data);
  // console.log(data[0]);
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };
  const addToCartHandle = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item is already in cart!");
    } else {
      if (dataArr[0].stock < count) {
        toast.error("Product in Stock not enough!");
      } else {
        const cartData = { ...dataArr[0], qty: count };
        dispatch(addToCart(cartData));
        toast.success("Add to cart success!");
      }
    }
  };
  console.log(dataArr[0]);

  const handleMessage = async () => {
    if (isAuthenticated) {
      const userId = user._id;

      const groupTitle = dataArr[0]._id + userId;
      const sellerId = dataArr[0].shop._id;
      await axios
        .post(`${server}/chat/create-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      toast.error("Please login to send message!");
    }
  };
  // WishLish
  const removeItemFromWishlistHandle = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };
  const addItemToWishlistHandle = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };
  const totaReviewsShop =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);
  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );
  const evarageRatingShop = totalRatings / totaReviewsShop || 0;
  return (
    <div className="bg-white">
      {dataArr[0] ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-[600px]  800px:w-[50%]">
                {/* <Magnifier src={`${dataArr[0] && dataArr[0].images[select]}`} /> */}
                <img
                  src={`${dataArr[0] && dataArr[0].images[select]}`}
                  alt=""
                  className="w-[500px] h-[600px] object-contain"
                />
                <div className="w-full flex">
                  {dataArr[0].images.map((i, index) => (
                    <div
                      key={index}
                      className={`${
                        select === index ? "border" : "null"
                      } cursor-pointer`}
                    >
                      <img
                        src={`${i}`}
                        alt=""
                        className="h-[100px] w-auto overflow-hidden m-3 mt-3"
                        onClick={() => setSelect(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <br />
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{dataArr[0].name}</h1>
                <p>{dataArr[0].description}</p>
                <div className="flex pt-3">
                  <h5 className={`${styles.productDiscountPrice}`}>
                    {dataArr[0].discountPrice}$
                  </h5>
                  <h4 className={`${styles.price}`}>
                    {dataArr[0].originalPrice}$
                  </h4>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[9px] ">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeItemFromWishlistHandle(dataArr[0])}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addItemToWishlistHandle(dataArr[0])}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                  onClick={() => addToCartHandle(dataArr[0]._id)}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <Link to={`/shop/preview/${dataArr[0]?.shopId}`}>
                    <img
                      src={`${dataArr[0]?.shop?.avatar}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2 border-[1px]"
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${dataArr[0]?.shopId}`}>
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {dataArr[0].shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        Ratings: {evarageRatingShop}/5
                      </h5>
                    </Link>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={() => handleMessage()}
                  >
                    <Link to={`/inbox`}>
                      <span className="text-white flex items-center">
                        Send Message
                        <AiOutlineMessage size={25} className="ml-1" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ProductDetailsInfo
            data={dataArr[0]}
            products={products}
            totaReviewsShop={totaReviewsShop}
            evarageRatingShop={evarageRatingShop}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};
const ProductDetailsInfo = ({
  data,
  products,
  totaReviewsShop,
  evarageRatingShop,
}) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Detail
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Review
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}
      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data ? (
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2 items-center" key={index}>
                <img
                  src={`${item.user.avatar}`}
                  alt=""
                  className="w-[60px] h-[60px] rounded-full border-[1px]"
                ></img>
                <div>
                  <h1 className="font-semibold">{item.user.name}:</h1>
                  <Ratings rating={item?.rating} />
                </div>

                <p className="mb-[20px]">{item.comment}</p>
              </div>
            ))
          ) : (
            <div className="w-full flex justify-center">
              <h5>No Reviews have for this product!</h5>
            </div>
          )}
        </div>
      ) : null}
      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.shopId}`}>
              <div className="flex items-center">
                <img
                  src={`${data?.shop?.avatar}`}
                  className="w-[50px] h-[50px] rounded-full border-[1px]"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    Ratings: {evarageRatingShop}/5
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">
              This shop is authencated, Commit that all the products are
              quality. The Customer can repay if felling not satify
            </p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:
                <span className="font-[500]">
                  {data?.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">{totaReviewsShop}</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
