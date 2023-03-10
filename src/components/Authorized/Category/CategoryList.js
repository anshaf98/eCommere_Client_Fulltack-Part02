import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategories,
  resetMutationResult,
  selectAllCategories,
  selectCategoryMutationResult,
} from "../../../redux/features/categorySlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteForeeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../../Loading/Loading";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { loading, categories } = useSelector(selectAllCategories);
  const { success } = useSelector(selectCategoryMutationResult);

  const deleteHandler = (id) => {
    dispatch(deleteCategory({ id, toast }));
  };

  const columns = [
    {
      field: "title",
      headerName: "Categories",
      headerClassName: "gridHeader",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "description",
      headerName: "Description",
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
            <Link
              to={`/authorized/category/${params.getValue(params.id, "id")}`}
            >
              <Tooltip title="Edit" placement="top" arrow>
                <EditIcon
                  sx={{ width: "30px", height: "30px", color: "green" }}
                />
              </Tooltip>
            </Link>

            <Tooltip title="Delete" placement="top" arrow>
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
  categories &&
    categories.forEach((category) => {
      rows.push({
        id: category._id,
        title: category.title,
        description: category.description,
      });
    });
  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
    }
    dispatch(getCategories({ toast }));
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
      <div className=" d-flex align-items-center justify-content-between">
        <h4 className=" mb-4">List Of Categories</h4>
        <Link to="/authorized/category" className=" btn2">
          Create Category
        </Link>
      </div>
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

export default CategoryList;
