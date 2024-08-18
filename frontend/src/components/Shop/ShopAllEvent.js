import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEventShop, getAllEventsShop } from "../../redux/actions/event";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
const ShopAllEvent = () => {
  const { events, isLoading } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);
  const handleDelele = (id, token) => {
    // console.log({ id });

    dispatch(deleteEventShop(id, token));

    window.location.reload();
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventsShop(seller[0]._id));
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Event Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Event Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.4,
    },
    {
      field: "start",
      headerName: "Starting Date",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "end",
      headerName: "Ending Date",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Review",
      headerName: "Review",

      minWidth: 80,
      flex: 0.4,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={25} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delelte",
      headerName: "Delete",
      type: "number",
      minWidth: 80,
      flex: 0.4,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelele(params.id, seller[1])}>
              <AiOutlineDelete size={25} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
        start: item.startDate.slice(0, 10),
        end: item.endDate.slice(0, 10),
      });
    });

  return (
    <div className="w-full mx-8 pt-1 mt-10 bg-white items-center text-center">
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

export default ShopAllEvent;
