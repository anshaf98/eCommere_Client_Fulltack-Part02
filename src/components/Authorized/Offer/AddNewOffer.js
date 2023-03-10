import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Box, TextField, Button } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import {
  addOffer,
  resetMutationResult,
  selectOfferMutationResult,
} from "../../../redux/features/offerSlice";

const AddNewOffer = () => {
  const dispatch = useDispatch();
  const { loading, success } = useSelector(selectOfferMutationResult);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = { title, description };
    dispatch(addOffer({ jsonData, toast }));
  };
  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
      setTitle("");
      setDescription("");
    }
  }, [success, dispatch]);

  return (
    <Box
      className=" box-shadow mt-5 mb-5"
      sx={{
        display: "flex",
        width: 450,
        flexDirection: "column",
        alignItems: "center",
        padding: "25px",
      }}
      style={{ margin: "0 auto" }}
    >
      <h4 className=" mb-3">Add Offer</h4>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          type="text"
          id="title"
          label="Title"
          name="title"
          margin="normal"
          variant="filled"
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
          variant="filled"
          required
          fullWidth
          autoFocus
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          disabled={loading}
          className=" btn2"
          startIcon={<AddBoxOutlinedIcon />}
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? "Loading..." : <>Add Offer</>}
        </Button>
      </Box>
    </Box>
  );
};

export default AddNewOffer;
