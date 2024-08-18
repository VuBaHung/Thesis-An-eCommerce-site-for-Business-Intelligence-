import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";
import { BiErrorAlt } from "react-icons/bi";

const AllOrderAdmin = () => {
  const { allSellers } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);
  const [load, setLoad] = useState(false);
  const [users, setUsers] = useState();
  useEffect(() => {
    async function getData() {
      await axios
        .get(`/admin/get-all-users`, { headers: { Authorization: token } })
        .then((res, err) => {
          setUsers([...res.data.users, ...allSellers]);
        })
        .catch((err) => console.log(err));
    }
    getData();
  }, [load]);
  const handleDeleteUser = async (id) => {
    const a = window.confirm("Do you want to delete this user?");
    if (a) {
      await axios
        .delete(`/admin/delete-user/${id}`, {
          headers: { Authorization: token },
        })
        .then((res, err) => {
          toast.success(res.data.msg);
          setLoad(!load);
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };
  //   console.log({ users });
  const columns = [
    { field: "id", headerName: "ID", minWidth: 150, flex: 1 },

    {
      field: "name",
      headerName: "Name",
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
      field: "role",
      headerName: "Role",
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
      field: "delete",
      flex: 0,
      minWidth: 50,
      headerName: "Delete",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => handleDeleteUser(params.id)}>
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
    },
  ];

  const row = [];

  users &&
    users.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        phone: item.phoneNumber,
        date: item.createdAt.slice(0, 10),
        role: item.role,
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
