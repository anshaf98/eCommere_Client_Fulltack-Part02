import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./Product.css";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { styled } from "@mui/material/styles";
import CollectionsIcon from "@mui/icons-material/Collections";

import {
  addBanner,
  resetMutationResult,
  selectBannerMutationResult,
} from "../../../redux/features/bannerSlice";
import { Box, Button, TextareaAutosize, TextField } from "@mui/material";

const AddNewBanner = () => {
  const Input = styled("input")({
    display: "none",
  });

  const dispatch = useDispatch();
  const { loading, success } = useSelector(selectBannerMutationResult);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState([]);
  const [productFiles, setProductFiles] = useState([]);

  const imageHandler = (e) => {
    const files = Array.from(e.target.files);
    setProductFiles(e.target.files);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (images.length < 1) {
      toast.error("Please select images.");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    Object.keys(productFiles).forEach((key) => {
      formData.append(productFiles.item(key).name, productFiles.item(key));
    });
    dispatch(addBanner({ formData, toast }));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
      setTitle("");
      setDescription("");
      setImages([]);
      setProductFiles("");
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
      <h4 className=" text-center">Create Product</h4>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          type="text"
          id="title"
          label="Title"
          variant="filled"
          name="title"
          margin="normal"
          required
          fullWidth
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextareaAutosize
          required
          aria-label="description"
          minRows={5}
          variant="filled"
          placeholder="Description"
          value={description}
          style={{
            width: "100%",
            marginTop: "16px",
            borderRadius: "10px",
            padding: "15px",
            borderColor: "#ccc",
            resize: "none",
          }}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box>
          <label htmlFor="productImage">
            <Input
              accept="imaage/*"
              id="productImage"
              multiple
              type="file"
              name="productImage"
              onChange={imageHandler}
            />
            <Button
              type="button"
              fullWidth
              component="span"
              variant="black"
              startIcon={<CollectionsIcon />}
              sx={{ m: "16px 0" }}
            >
              Upload photo
            </Button>
          </label>
        </Box>
        {images.length > 0 ? (
          <Box className="galleryback">
            {images.map((image, index) => (
              <img
                key={index}
                alt=""
                src={image}
                style={{ maxWidth: 90, maxHeight: 80, padding: "0 5px" }}
              />
            ))}
          </Box>
        ) : (
          <Box
            className="galleryback"
            style={{
              backgroundImage: `url("https://res.cloudinary.com/dpakxje91/image/upload/v1675681997/galleryback_oji1cc.png")`,
            }}
          >
            <img
              src="https://res.cloudinary.com/dpakxje91/image/upload/v1675682010/gallery_wj9yju.png"
              alt=""
            />
          </Box>
        )}

        <Button
          type="submit"
          fullWidth
          disabled={loading}
          className=" btn2"
          startIcon={<AddBoxOutlinedIcon />}
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? "Loading..." : <>Create Banner</>}
        </Button>
      </Box>
    </Box>
  );
};

export default AddNewBanner;
