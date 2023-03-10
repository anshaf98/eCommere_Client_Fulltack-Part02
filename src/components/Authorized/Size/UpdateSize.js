import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Box, TextField, Button } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";

import Loading from "../../Loading/Loading";
import {
  resetMutationResult,
  selectsizeDetails,
  selectSizeMutationResult,
  sizeDetails,
  updateSize,
} from "../../../redux/features/sizeSlice";

const UpdateSize = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  const { loading, size } = useSelector(selectsizeDetails);
  const { loading: isUdating, success } = useSelector(selectSizeMutationResult);

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = { title };
    dispatch(updateSize({ id, jsonData, toast }));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
    }
    dispatch(sizeDetails({ id, toast }));
  }, [dispatch, id, success]);

  useEffect(() => {
    if (size) {
      setTitle(size.title);
    }
  }, [size]);

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
          <h5>Update Size</h5>
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
              disabled={isUdating}
              className=" btn2"
              startIcon={<UpdateIcon />}
              sx={{ mt: 3, mb: 2 }}
            >
              {isUdating ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </>
              ) : (
                <>Update Size</>
              )}
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default UpdateSize;
