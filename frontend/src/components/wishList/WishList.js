import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addToCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
const WishList = ({ setOpenWishList }) => {
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishList(false)}
              />
            </div>
            <h5>Wishlist Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpenWishList(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={30} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist && wishlist.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      setOpenWishList={setOpenWishList}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, setOpenWishList }) => {
  const [value, setValue] = useState(1);
  const [click, setClick] = useState(false);
  const totalPrice = data.discountPrice * value;
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const addToCartHandle = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item is already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product in Stock not enough!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Add to cart success!");
        setOpenWishList(false);
      }
    }
  };
  const removeItemFromWishlistHandle = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };
  return (
    <div className="border-b p-4">
      <div className="w-full 800px:flex items-center justify-between">
        <RxCross1
          className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
          size={35}
          onClick={() => removeItemFromWishlistHandle(data)}
        />
        <img
          src={`${data.images[0]}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
            US$ {data.discountPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={30}
            className="cursor-pointer "
            tile="Add to cart"
            onClick={() => addToCartHandle(data._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default WishList;
