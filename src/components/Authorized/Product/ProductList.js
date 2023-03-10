import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProductsByAuthorizeRoles,
  resetMutationResult,
  selectAllProducts,
  selectProductMutationResult,
} from "../../../redux/features/productSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteForeeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../../Loading/Loading";
import { IMAGE_BASEURL } from "../../../constants/baseURL";

const ProductList = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector(selectAllProducts);
  const { success } = useSelector(selectProductMutationResult);

  const deleteHandler = (id) => {
    dispatch(deleteProduct({ id, toast }));
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
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
      field: "title",
      headerName: "Products",
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
              to={`/authorized/product/${params.getValue(params.id, "id")}`}
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
  products &&
    products.forEach((product) => {
      rows.push({
        id: product?._id,
        image: IMAGE_BASEURL + product?.images[0]?.url,
        title: product?.title,
        description: product?.description,
      });
    });
  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
    }
    dispatch(getProductsByAuthorizeRoles({ toast }));
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
        <h4 className=" mb-4">List Of Products</h4>
        <Link to="/authorized/product" className=" btn2">
          Create Product
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

export default ProductList;
