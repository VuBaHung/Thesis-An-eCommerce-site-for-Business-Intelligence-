import React, { useCallback, useEffect, useState } from "react";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import NotFoundPage from "../../pages/CustomerPages/NotFoundPage";
import { getAllProductsShop } from "../../redux/actions/product";

const ShopPage = ({ isOwner }) => {
  // const { seller } = useSelector((state) => state.seller);
  const [data, setData] = useState(null);
  const { products, isLoading } = useSelector((state) => state.product);

  const { id } = useParams();

  const dispatch = useDispatch();
  useCallback(() => {
    dispatch(getAllProductsShop(id));
  }, [id, dispatch]);
  useEffect(() => {
    axios
      .get(`${server}/shop/get-shop/${id}`)
      .then((res) => setData(res.data.shop))
      .catch((err) => console.log(err));
  }, [id]);

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

  const logOutHandler = async () => {
    await axios
      .get("/shop/logout")
      .then((res) => {
        toast.success(res.data.msg);
        localStorage.setItem("firstLogin", false);
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };
  return (
    // <div></div>
    data ? (
      <div>
        <div className="w-full py-5">
          <div className="w-full flex items-center justify-center">
            <img
              src={`${data.avatar}`}
              alt=""
              className="w-[150px] h-[150px] rounded-full object-cover border-[1px] border-[#859484]"
            />
          </div>
          <h3 className="text-center py-2 text-[20px]">{data.name}</h3>
          <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
            {data.description}
          </p>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Address</h5>
          <h4 className="text-[#000000a6]">{data.address}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Phone Number</h5>
          <h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Total Products:</h5>
          <h4 className="text-[#000000a6]">{products && products.length}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Shop Ratings</h5>
          <h4 className="text-[#000000a6]">{evarageRatingShop}/5</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Joined On</h5>
          <h4 className="text-[#000000a6]">{data.createdAt.slice(0, 10)}</h4>
        </div>
        {isOwner && (
          <div className="py-3 px-4">
            <Link to="/setting">
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
              >
                <span className="text-white">Edit Shop</span>
              </div>
            </Link>
            <div
              className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            >
              <span className="text-white" onClick={logOutHandler}>
                Log Out
              </span>
            </div>
          </div>
        )}
      </div>
    ) : (
      <NotFoundPage />
    )
  );
};

export default ShopPage;
