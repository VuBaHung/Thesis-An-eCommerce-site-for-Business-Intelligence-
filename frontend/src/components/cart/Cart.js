import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
const Cart = ({ setOpenCart }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const removeItemFromCartHandle = (data) => {
    dispatch(removeFromCart(data));
  };
  const quantityChangeHandle = (data) => {
    dispatch(addToCart(data));
  };
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  console.log({ user });
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={30}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
            />
          </div>
          {/* Item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <IoBagHandleOutline size={35} />
            <h5 className="pl-2 text-[20px] font-[500]">
              {cart && cart.length} items
            </h5>
          </div>
          {/* Cart single item */}
          <div className="w-full border-t">
            {cart &&
              cart.map((i, index) => (
                <CartSingle
                  key={index}
                  data={i}
                  quantityChangeHandle={quantityChangeHandle}
                  removeItemFromCartHandle={removeItemFromCartHandle}
                />
              ))}
          </div>
        </div>
        {/* Check Out */}
        <div className="px-5 mb-3">
          <Link to="/checkout">
            <div
              className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
            >
              <h1 className="text-[#fff] text-[18px] font-[600]">
                {user ? `  Checkout Now (${totalPrice})$` : `Login to checkout`}
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
const CartSingle = ({
  data,
  quantityChangeHandle,
  removeItemFromCartHandle,
}) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;
  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product in Stock not enough!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandle(updateCartData);
    }
  };
  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandle(updateCartData);
  };
  return (
    data && (
      <div className="border-b p-4">
        <div className="w-full flex items-center justify-between">
          <div>
            <div
              className={`bg-[red] border border-[#e4434373] rounded-full w-[30px] h-[30px] ${styles.noramlFlex} justify-center cursor-pointer `}
              onClick={() => increment(data)}
            >
              <HiPlus size={25} color="#fff" />
            </div>
            <span className="pl-[10px]">{value}</span>
            <div
              className="bg-[#216fe34f] rounded-full w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
              onClick={() => decrement(data)}
            >
              <HiMinus size={25} color="black" />
            </div>
          </div>
          <img
            src={`${data.images[0]}`}
            alt=""
            className="w-[130px] h-min   ml-2 mr-2 rounded-[5px] !object-cover"
          />
          <div className="pl-[5px]">
            <h1 className="block ">{data.name}</h1>
            <h4 className="font-[400] text-[15px] text-[#00000082]">
              ${data.discountPrice} * {value}
            </h4>
            <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
              US$ {totalPrice}
            </h4>
          </div>
          <RxCross1
            className="cursor-pointer"
            size={25}
            onClick={() => removeItemFromCartHandle(data)}
          />
        </div>
      </div>
    )
  );
};

export default Cart;
