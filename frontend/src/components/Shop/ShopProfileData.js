import React, { useEffect, useState } from "react";
import ProductCard from "../Route/ProductCard/ProductCard";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import NotFoundPage from "../../pages/CustomerPages/NotFoundPage";
import Ratings from "../Products/Rating";
import { getAllEventsShop } from "../../redux/actions/event";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.product);
  const [active, setActive] = useState(1);
  const [allReviews, setAllReviews] = useState([]);
  const { events } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(id));
  }, [dispatch]);
  useEffect(() => {
    if (products) {
      const allReviews =
        products && products.filter((product) => product.reviews.length !== 0);
      setAllReviews(allReviews);
    }
  }, []);
  console.log({ allReviews });
  useEffect(() => {
    isOwner
      ? dispatch(getAllEventsShop(seller[0]?._id))
      : dispatch(getAllEventsShop(id));
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="flex -w-full items-center justify-between ">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={` font-[600] text-[20px]  cursor-pointer pr-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              }`}
            >
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px]  cursor-pointer pr-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              }`}
            >
              Running Events
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px]  cursor-pointer pr-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              }`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                  <span className="text-[white]"> Go DashBoard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <br />
      {active === 1 &&
        (products ? (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {products &&
              products.map((i, index) => (
                <ProductCard data={i} key={index} isShop={true} />
              ))}
          </div>
        ) : (
          <NotFoundPage />
        ))}
      {active === 2 &&
        (events ? (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {events &&
              events.map((i, index) => (
                <ProductCard data={i} key={index} isShop={true} />
              ))}
          </div>
        ) : (
          <NotFoundPage />
        ))}
      {active === 3 && (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {allReviews ? (
            allReviews &&
            allReviews.flat().map((item, index) =>
              item.reviews.flat().map((review) => (
                <div className="w-full flex my-2 items-center" key={index}>
                  {/* {console.log(review.user.avatar)} */}
                  <img
                    src={`${review.user.avatar}`}
                    alt=""
                    className="w-[60px] h-[60px] rounded-full border-[1px]"
                  ></img>
                  <div>
                    <h1 className="font-semibold">{review.user.name}:</h1>

                    <Ratings rating={review?.rating} />
                  </div>
                  <p className="mb-[20px]">
                    {review.comment}{" "}
                    <span className=" italic text-end ml-[650px] text-[14] ">
                      At: {review.createdAt.slice(0, 10)}
                    </span>
                  </p>
                </div>
              ))
            )
          ) : (
            <div className="w-full flex justify-center">
              <h5>No Reviews have for this shop!</h5>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
