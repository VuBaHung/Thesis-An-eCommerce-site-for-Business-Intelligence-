import React from "react";
import { useState } from "react";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";
import { server } from "../../server";
const ShopCreate = () => {
  const navigate = useNavigate();

  const [shop, setShop] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    zipcode: "",
  });

  const [images, setImages] = useState("");
  const handleInputShopName = (e) => {
    const { name, value } = e.target;
    setShop({ ...shop, [name]: value });
  };

  const onChangeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) return alert("File not exist");
      if (file.size > 1024 * 1024) return alert("Size too large");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File format is incorrect");
      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${server}/user/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImages(res.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    //uploading img

    const formData = new FormData();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    formData.append("name", shop.name);
    formData.append("phoneNumber", shop.phoneNumber);
    formData.append("zipcode", shop.zipcode);
    formData.append("address", shop.address);
    formData.append("email", shop.email);
    formData.append("password", shop.password);
    formData.append("avatar", images.url);
    console.log({ images });
    axios
      .post(`${server}/shop/create-shop`, formData, config)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setShop({
            name: "",
            email: "",
            password: "",
            phoneNumber: "",
            zipcode: "",
            address: "",
            images: "",
          });

          navigate("/");
        }
      })
      .catch((err) => toast.error(err.response.data.msg));
  };
  return (
    <div className="min-h-screen bg-slate-300 flex flex-col  py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a seller
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className=" bg-white py-8 px-4 shadow sm:rounded-lg sm:px:10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Shop name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  required
                  value={shop.name}
                  onChange={handleInputShopName}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></input>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="phoneNumber"
                  required
                  value={shop.phoneNumber}
                  onChange={handleInputShopName}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></input>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="address"
                  required
                  value={shop.address}
                  onChange={handleInputShopName}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></input>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Zip code
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="zipcode"
                  required
                  value={shop.zipcode}
                  onChange={handleInputShopName}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></input>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={shop.email}
                  onChange={handleInputShopName}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></input>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="password"
                  autoComplete="password"
                  required
                  value={shop.password}
                  onChange={handleInputShopName}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></input>
              </div>
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              >
                Choose your shop avatar
              </label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 2-8 rounded-full overflow-hidden">
                  {images ? (
                    <img
                      src={images.url}
                      alt="avatar"
                      className="h-full w-full object-contain rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-9 w-9" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-500"
                >
                  <span> Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={onChangeAvatar}
                    className="sr-only"
                  ></input>
                </label>
              </div>
            </div>
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              {/* <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div> */}
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Register
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4> Already have an account?</h4>
              <Link to="/shop-login" className="text-blue-600 pl-2">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
