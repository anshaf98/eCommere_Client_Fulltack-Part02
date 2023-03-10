import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBrand,
  getBrands,
  resetMutationResult,
  selectAllBrands,
  selectBrandMutationResult,
} from "../../../redux/features/brandSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteForeeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../../Loading/Loading";

const BrandList = () => {
  const dispatch = useDispatch();
  const { loading, brands } = useSelector(selectAllBrands);
  const { success } = useSelector(selectBrandMutationResult);

  const deleteHandler = (id) => {
    dispatch(deleteBrand({ id, toast }));
  };

  const columns = [
    {
      field: "title",
      headerName: "Brands",
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
            <Link to={`/authorized/brand/${params.getValue(params.id, "id")}`}>
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
  brands &&
    brands.forEach((brand) => {
      rows.push({
        id: brand._id,
        title: brand.title,
        description: brand.description,
      });
    });
  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
    }
    dispatch(getBrands({ toast }));
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
        <h4 className=" mb-4">List Of Brands</h4>
        <Link to="/authorized/brand" className=" btn2">
          Create Brand
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

export default BrandList;
