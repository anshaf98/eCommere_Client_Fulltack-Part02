import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import BoxShadowLoader from "../../../components/Skeletons/BoxShadowLoader";

import { Box, Typography, TextField, Button } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import {
  brandDetails,
  resetMutationResult,
  selectBrandDetails,
  selectBrandMutationResult,
  updateBrand,
} from "../../../redux/features/brandSlice";
import Loading from "../../Loading/Loading";

const UpdateBrand = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { loading, brand } = useSelector(selectBrandDetails);
  const { loading: isUdating, success } = useSelector(
    selectBrandMutationResult
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = { title, description };
    dispatch(updateBrand({ id, jsonData, toast }));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
    }
    dispatch(brandDetails({ id, toast }));
  }, [dispatch, id, success]);

  useEffect(() => {
    if (brand) {
      setTitle(brand.title);
      setDescription(brand.description);
    }
  }, [brand]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box
          className=" box-shadow mt-5 mb-5"
          sx={{
            display: "flex",
            width: 500,
            flexDirection: "column",
            alignItems: "center",
            padding: "25px",
          }}
          style={{ margin: "0 auto" }}
        >
          <Typography component="div" variant="h5">
            Update brand
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              type="text"
              id="title"
              label="Title"
              name="title"
              margin="normal"
              required
              fullWidth
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              type="text"
              id="description"
              label="Description"
              name="description"
              margin="normal"
              required
              fullWidth
              autoFocus
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              disabled={isUdating}
              className=" btn2"
              startIcon={<UpdateIcon />}
              sx={{ mt: 3, mb: 2 }}
            >
              {isUdating ? "Loading..." : <>Update Brand</>}
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default UpdateBrand;
