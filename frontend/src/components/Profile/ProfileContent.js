import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { Country, State } from "country-state-city";
import axios from "axios";
import {
  deleteUserAddress,
  loadUser,
  updateUserAddress,
  updateUserInfor,
} from "../../redux/actions/user";
import { RxCross1 } from "react-icons/rx";
import { MdTrackChanges } from "react-icons/md";
import { InboxPage } from "../../Router";

function ProfileContent({ active }) {
  const { user, error, addressLoading } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState(user && user.password);
  const [images, setImages] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (addressLoading === true) {
      toast.success("Update success!");
    }
  }, [error, dispatch]);

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

      const res = await axios.post(`${server}/user/uploadImgUser`, formData, {
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
    try {
      dispatch(updateUserInfor(name, phoneNumber, email, images));
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <div className="w-full">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                className="w-[150px] h-[150px] rounded-full flex items-center object-cover border-[3px] border-[#3ad132]"
                src={images ? images.url : `${user?.avatar}`}
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={onChangeAvatar}
                />
                <label htmlFor="image">
                  <AiOutlineCamera size={30} className="cursor-pointer" />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                {/* <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div> */}
              </div>
              <div className="w-full 800px:flex block pb-3"></div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {active === 3 && (
        <div>
          <RefundOrders />
        </div>
      )}
      {active === 5 && (
        <div>
          <TrackOrders />
        </div>
      )}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
}
function AllOrders() {
  const { orders } = useSelector((state) => state.orders);
  console.log({ orders });

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.api.getCellValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order-detail/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  const row = [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div
      style={{
        height: 350,
        width: "95%",
        marginLeft: 40,
      }}
    >
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={8}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
}
function RefundOrders() {
  const { orders } = useSelector((state) => state.orders);

  let refundOrder =
    orders && orders.filter((item) => item.status === "Processing refund");
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.api.getCellValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order-detail/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  const row = [];
  refundOrder &&
    refundOrder.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div
      style={{
        height: 350,
        width: "95%",
        marginLeft: 40,
      }}
    >
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={8}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
}
function TrackOrders() {
  const { orders } = useSelector((state) => state.orders);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.api.getCellValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.4,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={25} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  const row = [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div
      style={{
        height: 350,
        width: "95%",
        marginLeft: 40,
      }}
    >
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={8}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
}
function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useSelector((state) => state.token);
  const changePasswordHandler = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(
          `${server}/user/update-password`,
          { oldPassword, newPassword, confirmPassword },
          { headers: { Authorization: token } }
        )
        .then((data) => toast.success("Change password success!"))
        .catch((err) => toast.error(err.response.data.msg));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full px-5">
      <div className=" w-full">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Change Password
        </h1>
        <div className="w-full">
          <form
            onSubmit={changePasswordHandler}
            className="flex flex-col items-center"
          >
            <div className="w-[50%] pb-2 mt-10 ">
              <label className="block pb-4 font-bold">
                Enter your password:
              </label>
              <input
                type="password"
                className={`${styles.input}`}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              ></input>
            </div>
            <div className="w-[50%] pb-2">
              <label className="block pb-4 font-bold">
                Enter new password:
              </label>
              <input
                type="password"
                className={`${styles.input}`}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              ></input>
            </div>
            <div className="w-[50%] pb-2">
              <label className="block pb-4 font-bold">
                Confirm new password:
              </label>
              <input
                type="password"
                className={`${styles.input}`}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <input
              className={`w-[30%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
function Address() {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { token } = useSelector((state) => state.token);
  const { user } = useSelector((state) => state.user);
  const id = user._id;
  const dispatch = useDispatch();
  const addressTypeData = [
    { name: "Default" },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields");
    } else {
      dispatch(
        updateUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
          id
        )
      );
      // setCountry("");
      // setCity("");
      // setAddress1("");
      // setAddress2("");
      // setZipCode("");
      // setAddressType("");
      // dispatch(loadUser());
      // setOpen(false);
    }
  };
  const handleDelete = (address1, addressType, userId) => {
    dispatch(deleteUserAddress(address1, addressType, userId));
    dispatch(loadUser(token));
  };
  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#2e28284b] top-0 left-0 flex items-center justify-center">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer absolute "
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-8">
                  <div className="w-full pb-2">
                    <label className="block pb-4 font-bold ">Country:</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block pb-2">
                        Choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-4 font-bold">City:</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block pb-2">
                        Choose your City
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-4 font-bold">Address 1:</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    ></input>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-4 font-bold">Address 2:</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    ></input>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-4 font-bold">Zipcode:</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    ></input>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-4 font-bold">
                      Address Type:
                    </label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-full border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block pb-2">
                        Choose your address type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-20 cursor-pointer`}
                      required
                      readOnly
                    ></input>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Address
        </h1>
        <div
          className={`${styles.button} !rounded-sm`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add new</span>
        </div>
      </div>
      <br />
      {user.addresses &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}:</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[15px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[15px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() =>
                  handleDelete(item.address1, item.addressType, user._id)
                }
              />
            </div>
          </div>
        ))}
    </div>
  );
}
export default ProfileContent;
