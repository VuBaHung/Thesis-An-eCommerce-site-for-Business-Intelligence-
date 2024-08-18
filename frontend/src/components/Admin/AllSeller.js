import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";

const AllOrderAdmin = () => {
  const { allSellers } = useSelector((state) => state.user);
  console.log({ allSellers });
  const columns = [
    { field: "id", headerName: "Shop ID", minWidth: 150, flex: 1 },

    {
      field: "name",
      headerName: "Shop Name",
      type: "string",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      type: "string",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      type: "string",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "date",
      headerName: "Join date",
      type: "string",
      minWidth: 130,
      flex: 1,
    },

    {
      field: " ",
      flex: 0,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/shop/preview/${params.id}`}>
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

  allSellers &&
    allSellers.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        phone: item.phoneNumber,
        date: item.createdAt.slice(0, 10),
        address: item.address,
        status: item.status,
      });
    });

  return (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default AllOrderAdmin;
