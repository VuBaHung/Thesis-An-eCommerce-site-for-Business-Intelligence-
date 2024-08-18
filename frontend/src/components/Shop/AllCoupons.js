import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import {
  deleteProductShop,
  getAllProductsShop,
} from "../../redux/actions/product";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../../styles/styles";
import NotFoundPage from "../../pages/CustomerPages/NotFoundPage";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
const AllCoupons = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [minAmount, setMinAmount] = useState(undefined);
  const [maxAmount, setMaxAmount] = useState(undefined);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [coupons, setCoupons] = useState([]);
  const { products, isLoading } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);

  const handleDelele = async (id) => {
    await axios
      .delete(`${server}/coupon/delete-shop-coupon/${id}`)
      .then((res) => toast.success("Delete Success"))
      .catch((error) => toast.error(error));
    window.location.reload();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${server}/coupon/create-coupoun`, {
        shopId: seller[0]._id,
        name,
        value,
        minAmount,
        maxAmount,
        selectedProduct,
      });

      toast.success("Create coupon success!");
      window.location.reload();
    } catch (error) {
      toast.error(error);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(seller[0]._id));
  }, [dispatch]);
  useEffect(() => {
    const getAllCoupons = async () => {
      const { data } = await axios.get(
        `${server}/coupon/get-all-coupons/${seller[0].name}`
      );

      setCoupons(data);
    };
    getAllCoupons();
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name Code",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "value",
      headerName: "Discount Percentage",
      minWidth: 100,
      flex: 1.0,
    },
    {
      field: "MinPrice",
      headerName: "Min Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "MaxPrice",
      headerName: "Max Price",
      type: "number",
      minWidth: 80,
      flex: 0.6,
    },

    {
      field: "ForProduct",
      headerName: "Product Applied",
      minWidth: 180,
      flex: 0.6,
    },

    {
      field: "Delelte",
      headerName: "Delete",
      type: "number",
      minWidth: 130,
      flex: 0.8,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelele(params.id, seller[1])}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        value: item.value + "%",
        name: item.name,
        MinPrice: "US$ " + item.minAmount,
        MaxPrice: "US$ " + item.maxAmount,
        ForProduct: item.selectedProduct ? item.selectedProduct : "All Product",
      });
    });
  const [open, setOpen] = useState(false);
  return (
    <>
      {isLoading ? (
        <NotFoundPage />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-[170px]`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[200000] flex items-center justify-center">
              <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4 ">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  />
                </div>
                <form onSubmit={handleSubmit}>
                  <br />
                  <div>
                    <label className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your coupon code name..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Discount Percentage{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="value"
                      required
                      value={value}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter your discount percentage..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Min Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="min"
                      value={minAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder="Min price to use the code..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Max Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="max"
                      value={maxAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Max price to use the code..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Select Product</label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="Choose a category">Choose product</option>
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div>
                      <input
                        type="submit"
                        value="Create"
                        className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] !placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
