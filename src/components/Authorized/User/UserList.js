import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  resetMutationResult,
  selectUserList,
  selectMutationResult,
  deleteUser,
} from "../../../redux/features/authSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IMAGE_BASEURL } from "../../../constants/baseURL";

import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import DeleteForeeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../../Loading/Loading";

const UserList = () => {
  const dispatch = useDispatch();
  const { loading, users } = useSelector(selectUserList);
  const { success } = useSelector(selectMutationResult);

  const deleteHandler = (id) => {
    dispatch(deleteUser({ id, toast }));
  };

  const columns = [
    {
      field: "image",
      headerName: "Avatar",
      headerClassName: "gridHeader",
      flex: 0.4,
      minWidth: 60,
      renderCell: (params) => {
        return params.value === "" ? (
          ""
        ) : (
          <img
            src={params.value}
            alt=""
            height="100%"
            style={{ borderRadius: "50%", width: "50px", objectFit: "cover" }}
          />
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "gridHeader",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "gridHeader",
      flex: 1.5,
      minWidth: 250,
    },
    {
      field: "role",
      headerName: "Role",
      headerClassName: "gridHeader",
      flex: 1.5,
      minWidth: 250,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "gridHeader",
      flex: 0.5,
      minWidth: 80,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/authorized/user/${params.getValue(params.id, "id")}`}>
              <Tooltip title="Edit" placement="top">
                <EditIcon
                  sx={{ width: "30px", height: "30px" }}
                  style={{ color: "green" }}
                />
              </Tooltip>
            </Link>

            <Tooltip title="Delete" placement="top">
              <IconButton
                color="error"
                component="span"
                onClick={() => deleteHandler(params.getValue(params.id, "id"))}
              >
                <DeleteForeeverIcon sx={{ width: "30px", height: "30px" }} />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];
  const rows = [];
  users &&
    users.forEach((user) => {
      rows.push({
        id: user._id,
        name: user.name,
        image: IMAGE_BASEURL + user.avatar.url,
        email: user.email,
        role: user.roles,
      });
    });
  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
    }
    dispatch(getAllUsers({ toast }));
  }, [dispatch, success]);

  return (
    <Box
      style={{
        displya: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "15px",
        textAlign: "center",
      }}
    >
      <Typography component="h1" variant="h5" sx={{ m: 4 }}>
        Full List of Users
      </Typography>
      {loading ? (
        <Loading />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          autoHeight
        />
      )}
    </Box>
  );
};

export default UserList;
