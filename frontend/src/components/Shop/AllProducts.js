import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Markdown from "react-markdown";
import {
  deleteProductShop,
  getAllProductsShop,
} from "../../redux/actions/product";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";

import NotFoundPage from "../../pages/CustomerPages/NotFoundPage";
import TrendingCategory, {
  calculateTopCategoriesPerMonth,
} from "./TrendingCategory";
import TrendingProducts from "./TrendingProducts";
import { TbMessageChatbot } from "react-icons/tb";
import { FaRobot } from "react-icons/fa";
import { isSimilar } from "./Prompt/Promt";
import axios from "axios";
const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);
  const { shopOrders } = useSelector((state) => state.orders);
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const handleDelele = (id, token) => {
    dispatch(deleteProductShop(id, token));
    window.location.reload();
  };
  const handleUpdate = (id, token) => {};
  const dispatch = useDispatch();
  // const date = new Date(shopOrders[0].createdAt);

  useEffect(() => {
    dispatch(getAllProductsShop(seller[0]._id));
    setReply(
      `Welcome to products page. The top 3 trending products is ${cate[0]}, ${cate[1]}, ${cate[2]}.`
    );
  }, [dispatch]);
  const topCategories =
    shopOrders && calculateTopCategoriesPerMonth(shopOrders);
  const categoryData = Object.values(topCategories);
  const amounts = {};
  categoryData.forEach((item) => {
    Object.entries(item).forEach(([category, quantity]) => {
      amounts[category] = (amounts[category] || 0) + quantity;
    });
  });
  const cate = Object.keys(amounts);
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
      flex: 0.3,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.3,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.3,
    },
    {
      field: "Review",
      headerName: "Review",

      minWidth: 130,
      flex: 0.3,
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
      field: "modify",
      headerName: "Modify",
      type: "string",
      minWidth: 130,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleUpdate(params.id, seller[1])}>
              <AiOutlineEdit size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: "Delelte",
      headerName: "Delete",
      type: "number",
      minWidth: 130,
      flex: 0.3,
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
  const HandleSuggest = () => {
    const here = (
      <Link to={"/dashboard/cuppouns"}>
        <button className="italic underline text-green-400">coupon</button>
      </Link>
    );
    const here1 = (
      <Link to={"/dashboard-create-product"}>
        <button className="italic underline text-green-400">Product</button>
      </Link>
    );
    const here2 = (
      <Link to={"/dashboard-create-event"}>
        <button className="italic underline text-green-400">Event</button>
      </Link>
    );

    const suggest = (
      <div className="font-bold text-green-800 text-lg pt-4 ">
        You can increase orders by some strategies below: <br /> Click {here} to
        create a new discount coupon.
        <br /> Click {here1} to create a new product.
        <br />
        Click
        {here2} to create a new event.
      </div>
    );

    return suggest;
  };
  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });
  const handleSubmit = (e) => {
    e.preventDefault();

    let conditionMet = false;

    if (isSimilar(prompt, "hello")) {
      setReply("Hello, welcome to Emazing Shop");
      conditionMet = true;
    }

    if (isSimilar(prompt, "total product in store")) {
      setReply(`Your shop has a total of ${products.length} products.`);
      conditionMet = true;
    }

    if (isSimilar(prompt, "best selling product ")) {
      setReply(
        `Your best selling product is ${bestSellingProduct} with ${maxSales} units sold.`
      );

      conditionMet = true;
    }
    if (isSimilar(prompt, "how to increase order quanity ")) {
      setReply(HandleSuggest());

      conditionMet = true;
    }

    if (!conditionMet) {
      const sendPrompt = async () => {
        try {
          const res = await axios.post(`http://localhost:8000/chat/chat-ai`, {
            initalPrompt: prompt,
          });
          setReply(res.data.reply);
        } catch (err) {
          console.log(err);
        }
      };
      sendPrompt();
    }

    setPrompt("");
  };
  useEffect(() => {
    console.log(prompt);
  }, [prompt]);
  const products1 = [];
  shopOrders &&
    shopOrders.map((order) => {
      products1.push(order.cart);
    });

  const aggregatedProducts = products1.flat().reduce((accumulator, current) => {
    const existingProduct = accumulator.find(
      (item) => item.name === current.name
    );
    if (existingProduct) {
      existingProduct.qty += current.qty;
    } else {
      accumulator.push({ name: current.name, qty: current.qty });
    }
    return accumulator;
  }, []);

  // Sort productData by sales in descending order
  const sortedProducts = aggregatedProducts.sort((a, b) => b.sales - a.sales);

  // Get top 5 best-selling products
  const topProducts = sortedProducts.slice(0, 5);

  // Extract product names and sales for chart data
  const productNames = topProducts.map((product) => product.name);
  const productSales = topProducts.map((product) => product.qty);
  const maxSales = Math.max(...productSales);
  const maxSalesIndex = productSales.indexOf(maxSales);
  const bestSellingProduct = productNames[maxSalesIndex];
  return isLoading ? (
    <NotFoundPage />
  ) : (
    <div className="w-full mx-8 pt-1 mt-10 bg-white items-center">
      {shopOrders && (
        <div className=" flex w-full">
          <div className="w-[40%] justify-start  mb-20 block items-center text-center">
            <TrendingCategory precision={0} orders={shopOrders} />
            <h4 className="text-[22px] font-Poppins pb-2">Top 3 categories</h4>
          </div>

          <div className="w-[40%] justify-start  mb-20 block items-center text-center">
            <TrendingProducts
              productSales={productSales}
              productNames={productNames}
            />
            <h4 className="text-[22px] font-Poppins pb-2">Top 5 products</h4>
          </div>
          {open ? (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg w-[800px]">
                <div className="p-4">
                  <h1 className="text-2xl font-bold flex justify-center gap-3">
                    <FaRobot size={40} /> AI Helper
                  </h1>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className=" bg-red-500 text-white p-1 px-2 rounded hover:bg-red-700 transition-colors duration-200 ease-in-out font-bold"
                      onClick={() => setOpen(false)}
                    >
                      X
                    </button>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-lg shadow-lg w-full">
                      <div className="p-4 h-[400px] overflow-y-auto">
                        <div className="mb-2">
                          <p className="text-green-400 text-base text-[1.5em]">
                            {typeof reply === "string" ? (
                              <Markdown>{reply}</Markdown>
                            ) : (
                              <span>{reply}</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 border-t flex">
                        <input
                          id="chatInput"
                          type="text"
                          className="w-full p-2 border rounded"
                          placeholder="Type your message here..."
                          onChange={(e) => setPrompt(e.target.value)}
                          value={prompt}
                        />
                        <button
                          type="submit"
                          className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-700 transition-colors duration-200 ease-in-out"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="flex justify-center mt-[33px] w-[20%] bg-green-300 text-white p-1 px-2 rounded hover:bg-green-500 transition-colors duration-200 ease-in-out h-[55px] cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <h1 className="text-2xl font-bold flex justify-center gap-3">
                AI Helper
              </h1>
              <TbMessageChatbot size={50} color="red" />
            </div>
          )}
        </div>
      )}
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

export default AllProducts;
