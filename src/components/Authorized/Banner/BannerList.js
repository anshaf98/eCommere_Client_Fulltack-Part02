import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteForeeverIcon from "@mui/icons-material/DeleteForever";
import Loading from "../../Loading/Loading";
import { IMAGE_BASEURL } from "../../../constants/baseURL";
import {
  deleteBanner,
  getBanners,
  resetMutationResult,
  selectAllBanners,
  selectBannerMutationResult,
} from "../../../redux/features/bannerSlice";
import { Link } from "react-router-dom";

const BannerList = () => {
  const dispatch = useDispatch();
  const { loading, banners } = useSelector(selectAllBanners);
  const { success } = useSelector(selectBannerMutationResult);

  const deleteHandler = (id) => {
    dispatch(deleteBanner({ id, toast }));
  };

  const columns = [
    {
      field: "image",
      headerName: "Banner Image",
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
  banners &&
    banners.forEach((product) => {
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
    dispatch(getBanners({ toast }));
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
        <h4 className=" mb-4">List Of Banners</h4>
        <Link to="/authorized/banner" className=" btn2">
          Create Banners
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

export default BannerList;
