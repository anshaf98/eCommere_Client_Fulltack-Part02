import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  Box,
  Avatar,
  TextField,
  Button,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { registration } from "../../redux/features/authSlice";
import MetaData from "../../components/Metadata";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Registration = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const [previewAvatar, setPreviewAvatar] = useState("");
  const [avatar, setAvatar] = useState("");

  const imageHandler = (e) => {
    console.log(e.target.name);
    if (e.target.name === "avatar") {
      setAvatar(e.target.files);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (avatar === "") {
      toast.warn("Please select a profile picture");
      return false;
    }
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    Object.keys(avatar).forEach((key) => {
      formData.append(avatar.item(key).name, avatar.item(key));
    });
    dispatch(registration({ formData, toast }));
  };

  const handleKeepMeLoggedIn = () => {};
  return (
    <>
      <MetaData title={`Register - Mohamed`} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3 className=" logo mb-2">MOHAMED</h3>
        <h5 className=" mb-3">CREATE YOUR ACCOUNT</h5>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            type="text"
            id="name"
            label="Name"
            name="name"
            margin="normal"
            variant="filled"
            required
            fullWidth
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            type="email"
            id="email"
            label="Email"
            name="email"
            variant="filled"
            margin="normal"
            required
            fullWidth
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            id="password"
            variant="filled"
            label="Password"
            name="password"
            margin="normal"
            required
            fullWidth
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Grid container style={{ alignItems: "center", margin: "10px 0" }}>
            <Grid item xs>
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: "black",
                  height: "50px",
                  width: "50px",
                  fontSize: "3rem",
                }}
              >
                {!previewAvatar ? (
                  <AccountCircleIcon fontSize="2.5rem" color="#000" />
                ) : (
                  <img
                    src={previewAvatar}
                    alt={previewAvatar}
                    style={{ width: 80, height: 80 }}
                  />
                )}
              </Avatar>
            </Grid>
            <Grid>
              <Button
                fullWidth
                variant="black"
                component="label"
                startIcon={<PhotoCamera />}
              >
                <input
                  type="file"
                  hidden
                  name="avatar"
                  onChange={imageHandler}
                />
                Upload Your Profile
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            className=" btn2"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>

          <Grid container>
            <Grid item xs>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...label}
                      icon={<BookmarkBorderIcon />}
                      checkedIcon={<BookmarkIcon />}
                      style={{ color: "#111" }}
                    />
                  }
                  label="Keep me logged in."
                  checked={checked}
                  onChange={handleKeepMeLoggedIn}
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Registration;
