import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Box, TextField, Button } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import {
  addSize,
  resetMutationResult,
  selectSizeMutationResult,
} from "../../../redux/features/sizeSlice";

const AddSize = () => {
  const dispatch = useDispatch();
  const { loading, success } = useSelector(selectSizeMutationResult);
  const [title, setTitle] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = { title };
    dispatch(addSize({ jsonData, toast }));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
      setTitle("");
    }
  }, [success, dispatch]);

  return (
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
      <h5>Add Category</h5>
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
        <Button
          type="submit"
          fullWidth
          disabled={loading}
          className=" btn2"
          startIcon={<AddBoxOutlinedIcon />}
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </>
          ) : (
            <>Add Size</>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default AddSize;
