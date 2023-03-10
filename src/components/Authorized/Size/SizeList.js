import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteCategory,
//   getCategories,
//   resetMutationResult,
//   selectAllCategories,
//   selectCategoryMutationResult,
// } from "../../../redux/features/categorySlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import DeleteForeeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../../Loading/Loading";
import {
  deleteSize,
  getSizes,
  resetMutationResult,
  selectAllSize,
  selectSizeMutationResult,
} from "../../../redux/features/sizeSlice";

const SizeList = () => {
  const dispatch = useDispatch();
  const { loading, sizes } = useSelector(selectAllSize);
  const { success } = useSelector(selectSizeMutationResult);

  const deleteHandler = (id) => {
    dispatch(deleteSize({ id, toast }));
  };

  const columns = [
    {
      field: "title",
      headerName: "Size",
      headerClassName: "gridHeader",
      flex: 1,
      minWidth: 170,
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
            <Link to={`/authorized/size/${params.getValue(params.id, "id")}`}>
              <Tooltip title="Edit" placement="top">
                <EditIcon
                  sx={{ width: "30px", height: "30px", color: "green" }}
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
  sizes &&
    sizes.forEach((size) => {
      rows.push({
        id: size._id,
        title: size.title,
      });
    });
  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
    }
    dispatch(getSizes({ toast }));
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
        Full list of Size
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

export default SizeList;
