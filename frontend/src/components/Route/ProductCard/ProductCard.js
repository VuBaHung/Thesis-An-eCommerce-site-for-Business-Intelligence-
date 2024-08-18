import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailCard from "../ProductDetailCard/ProductDetailCard.js";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist.js";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(false);
  // const d = data.name;
  // const product_name = d.replace(/\s+/g, "-");
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data._id]);
  const removeItemFromWishlistHandle = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };
  const addItemToWishlistHandle = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-sm p-3 relative cursor-pointer min-w-[5em]">
      <div>
        <Link
          to={`/products/${data._id}`}
          className="flex items-center content-center"
        >
          <>
            <img
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              src={`${data.images[0]}`}
              alt=""
              className="w-full max-h-[180px] object-contain p-4"
            />
          </>
        </Link>
        <Link to={`/shop/preview/${data?.shopId}`}>
          <h5 className={`${styles.shop_name} font-bold`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/products/${data._id}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 30 ? data.name.slice(0, 27) + "..." : data.name}{" "}
          </h4>
        </Link>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((i) =>
            data.ratings >= i ? (
              <AiFillStar
                key={i}
                className="mr-1 cursor-pointer"
                color="rgb(246,186,0)"
                size={22}
              />
            ) : (
              <AiOutlineStar
                key={i}
                className="mr-1 cursor-pointer"
                color="rgb(246,186,0)"
                size={22}
              />
            )
          )}
          {/* <AiFillStar
            className="mr-2 cursor-pointer"
            color="#F6BA00"
            size={22}
          />
          <AiFillStar
            className="mr-2 cursor-pointer"
            color="#F6BA00"
            size={22}
          />
          <AiFillStar
            className="mr-2 cursor-pointer"
            color="#F6BA00"
            size={22}
          />
          <AiFillStar
            className="mr-2 cursor-pointer"
            color="#F6BA00"
            size={22}
          />
          <AiOutlineStar
            className="mr-2 cursor-pointer"
            color="#F6BA00"
            size={22} */}
          {/* /> */}
        </div>
        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              {data.discountPrice === 0 ? null : data.discountPrice} $
            </h5>
            <h4 className={`${styles.price}`}>
              {data.originalPrice ? data.originalPrice + "$" : null}
            </h4>
          </div>
          <span className="font-[400] text-[17px] text-[#68d284]">
            {data.sold_out}sold
          </span>
        </div>
        {/* side icon */}
        <div>
          {click ? (
            <AiFillHeart
              size={30}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeItemFromWishlistHandle(data)}
              color={click ? "red" : "#333"}
              title="Remove from Wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={30}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addItemToWishlistHandle(data)}
              color={click ? "red" : "#333"}
              title="Add to Wishlist"
            />
          )}

          <AiOutlineEye
            size={30}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={30}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => setOpen(!open)}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductDetailCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
