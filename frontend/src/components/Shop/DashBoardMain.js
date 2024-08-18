import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import Markdown from "react-markdown";
import { FaRobot } from "react-icons/fa";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { TbMessageChatbot } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { loadShopOrders } from "../../redux/actions/order";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DashBoardLineChart from "./DashBoardLineChart";
import axios from "axios";
import { getAllProductsShop } from "../../redux/actions/product";
import { isSimilar } from "./Prompt/Promt";

const DashBoardMain = () => {
  const dispatch = useDispatch();
  const { shopOrders } = useSelector((state) => state.orders);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [total, setTotal] = useState([]);
  const [open, setOpen] = useState(true);

  const totatEachMonth = useMemo(
    function calculateAmount() {
      const monthlyTotals = {};
      for (let i = 1; i <= 12; i++) {
        monthlyTotals[i] = 0;
      }
      const orderedData =
        shopOrders &&
        shopOrders.filter((order) => order.status === "Delivered");
      orderedData?.forEach((order) => {
        const monthYear = order.createdAt.slice(5, 7) * 1;
        if (!monthlyTotals[monthYear]) {
          monthlyTotals[monthYear] = 0;
        }
        monthlyTotals[monthYear] += order.totalPrice;
      });
      return monthlyTotals;
    },
    [shopOrders]
  );

  const values = totatEachMonth && Object.values(totatEachMonth);
  const lastThreeValues = values && values.slice(-3);
  const avarageRevenue = total && total / 12;

  useEffect(() => {
    seller && dispatch(loadShopOrders(seller[1]));
    seller && dispatch(loadShopOrders(seller[0]._id));
    seller && dispatch(getAllProductsShop(seller[0]._id));
  }, [dispatch, seller]);

  useEffect(() => {
    const orderedData =
      shopOrders && shopOrders.filter((order) => order.status === "Delivered");
    const totalEarnWithoutTax =
      orderedData &&
      orderedData.reduce((acc, order) => acc + order.totalPrice, 0);

    setTotal(totalEarnWithoutTax && totalEarnWithoutTax.toFixed());
  }, [shopOrders]);
  const initalPrompt = `The avarage revenue each month is ${avarageRevenue}. In the 3 months ${
    values.length - 2
  },${values.length - 1},${values.length}. Total revenue was respectively ${
    lastThreeValues[0]
  }$, ${lastThreeValues[1]}$, ${
    lastThreeValues[2]
  }$. Summarizes and list some strategies to increase revenue in brief.`;

  useEffect(() => {
    const sendPrompt = async () => {
      // await axios
      //   .post(`http://localhost:8000/chat/chat-ai`, {
      //     initalPrompt: initalPrompt,
      //   })
      //   .then((res) => setReply(res.data.reply))
      //   .catch((err) => console.log(err));
    };
    avarageRevenue && sendPrompt();
  }, [avarageRevenue, initalPrompt]);

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

  shopOrders &&
    shopOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  const handleSubmit = (e) => {
    e.preventDefault();

    let conditionMet = false;

    if (isSimilar(prompt, "hello")) {
      setReply("Hello, welcome to Emazing Shop");
      conditionMet = true;
    } else if (isSimilar(prompt, "your name")) {
      setReply("My name is Emazing AI");
      conditionMet = true;
    } else if (isSimilar(prompt, "what you can do?")) {
      setReply("I can answer your questions and assist you when needed.");
      conditionMet = true;
    } else if (isSimilar(prompt, "Brief about my shop?")) {
      setReply(
        `Your shop name WaterShop with available balance is ${total}$ with ${shopOrders.length} orders and ${products.length} selling products  .`
      );
      conditionMet = true;
    } else if (isSimilar(prompt, "increase revenue")) {
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
        Click {here} to create a new discount coupon. {here1} to create a new
        product. {here2} to create a new event.
      </div>
    );

    return suggest;
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="w-[80%] p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Account Balance
              <span className="text-[16px]">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            ${total ? total : 0}
          </h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-[2] text-[#077f9c]">Withdraw Money</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {shopOrders && shopOrders.length}
          </h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {products && products.length}
          </h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
      </div>
      <div className="w-[100%] flex ">
        <div className="w-[80%]">
          {totatEachMonth && (
            <DashBoardLineChart
              ordersData={totatEachMonth}
              name={"Account balance"}
            />
          )}
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
                    onClick={handleClose}
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
      <br />
      <div className="w-50% min-h-[45vh] bg-white rounded">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default DashBoardMain;
