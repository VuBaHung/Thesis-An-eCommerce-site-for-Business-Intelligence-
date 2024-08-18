import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteProductShop, getAllProducts } from "../../redux/actions/product";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";

import NotFoundPage from "../../pages/CustomerPages/NotFoundPage";
import { toast } from "react-toastify";
const AllProductsAdmin = () => {
  const [load, setLoad] = useState(false);
  const { allProducts, isLoading } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.token);
  const handleDelele = (id, token) => {
    const a = window.confirm("Do you want to delete this product?");
    if (a) {
      dispatch(deleteProductShop(id, token));
      toast.success("Delete success!");
      setLoad((prev) => !prev);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts(50));
  }, [dispatch]);
  useEffect(() => {}, [load]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.2,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.5,
    },
    {
      field: "Review",
      headerName: "Review",
      minWidth: 130,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/products/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delelte",
      headerName: "Delete",
      minWidth: 130,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelele(params.id, token)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  allProducts &&
    allProducts.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  return isLoading ? (
    <NotFoundPage />
  ) : (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default AllProductsAdmin;
