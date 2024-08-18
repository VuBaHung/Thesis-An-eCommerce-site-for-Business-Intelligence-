import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Markdown from "react-markdown";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";

import { loadShopOrders } from "../../redux/actions/order";
import OrderChart from "./OrderChart";
import { FaRobot } from "react-icons/fa";
import { isSimilar } from "./Prompt/Promt";
import axios from "axios";
import { TbMessageChatbot } from "react-icons/tb";
const AllOders = () => {
  const [ordersData, setOrdersData] = useState();
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const { seller } = useSelector((state) => state.seller);
  const { shopOrders } = useSelector((state) => state.orders);
  const handleDelele = (id, token) => {};
  const dispatch = useDispatch();

  const totalOrders =
    ordersData && ordersData.reduce((order, item) => (order += item), 0);
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
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 1,
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
      flex: 0.3,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.5,
    },
    {
      field: "date",
      headerName: "Created at",
      type: "string",
      minWidth: 130,
      flex: 1,
    },
    {
      field: " ",
      flex: 0.3,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
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
  const frequency = {};
  for (let i = 1; i <= 12; i++) {
    frequency[i] = 0;
  }

  const month = shopOrders?.map((order) => order.createdAt.slice(5, 7) * 1);

  month?.forEach((element) => {
    if (element in frequency) {
      frequency[element]++;
    }
  });
  shopOrders &&
    shopOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        date: item.createdAt.slice(0, 7) + "-" + item.createdAt.slice(11, 16),
        status: item.status,
      });
    });
  const handleSubmit = (e) => {
    e.preventDefault();

    let conditionMet = false;

    if (isSimilar(prompt, "hello")) {
      setReply("Hello, welcome to Emazing Shop");
      conditionMet = true;
    }

    if (isSimilar(prompt, "order last month")) {
      setReply(
        `In the last month, the total order is ${
          ordersData[ordersData.length - 1]
        }.`
      );
      conditionMet = true;
    }

    if (
      isSimilar(prompt, "summarize the situation of quanity orders each month ")
    ) {
      setReply(
        "The order volume fluctuated throughout the year, with a peak of 3 orders in December and a low of 0 orders in October.  The first quarter saw a higher volume than the second and third quarters, with the final quarter experiencing a spike in orders again. Overall, the year saw a relatively consistent, low-to-moderate order volume with a few notable peaks."
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
    const sendPrompt = async () => {
      const initalPrompt = `Notify to the shop name Emazing about orders in last three months 12, 11, 10 respectively ${
        ordersData[ordersData.length - 1]
      },${ordersData[ordersData.length - 2]},${
        ordersData[ordersData.length - 3]
      } and total orders until now is ${totalOrders}`;
      await axios
        .post(`http://localhost:8000/chat/chat-ai`, {
          initalPrompt: initalPrompt,
        })
        .then((res) => setReply(res.data.reply))
        .catch((err) => console.log(err));
    };
    ordersData && sendPrompt();
  }, [ordersData]);

  useEffect(() => {
    seller && dispatch(loadShopOrders(seller[1]));
    setOrdersData(Object.values(frequency));
  }, [dispatch, seller]);

  if (!ordersData) {
    return null;
  }

  return (
    <div className="w-full mx-5 pt-1 mt-5 bg-white">
      <div className="w-full items-center justify-center flex   ">
        <div className="w-[80%]">
          <OrderChart
            ordersData={ordersData}
            name={"Orders"}
            precision={0}
            type={"Bar"}
          />
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
            className="flex justify-center mt-[33px] bg-green-300 text-white p-1 px-2 rounded hover:bg-green-500 transition-colors duration-200 ease-in-out h-[55px] cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <h1 className="text-2xl font-bold flex justify-center gap-3">
              AI Helper
            </h1>
            <TbMessageChatbot size={50} color="red" />
          </div>
        )}
      </div>
      <h3 className="text-[22px] font-Poppins pb-2"> Orders</h3>
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

export default AllOders;
