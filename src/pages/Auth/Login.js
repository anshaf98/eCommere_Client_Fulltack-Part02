import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import {
  Box,
  TextField,
  Button,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  login,
  persistLogin,
  selectLoggedInUser,
} from "../../redux/features/authSlice";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MetaData from "../../components/Metadata";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let path = "/";
  if (location.state) {
    path = location.state.path;
  }

  const dispatch = useDispatch();
  const { accessToken } = useSelector(selectLoggedInUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const jsonData = {
      email,
      password,
    };
    dispatch(login({ jsonData, toast }));
  };

  const handleKeepMeLoggedIn = async (e) => {
    setChecked(!checked);
    dispatch(persistLogin(!checked));
  };

  useEffect(() => {
    if (accessToken) {
      navigate(path);
    }
  }, [accessToken, navigate, path]);

  // ! *******************************************************

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <MetaData title={`Login - Mohamed`} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3 className=" logo mb-2">MOHAMED</h3>
        <h5 className="mb-3">WELCOME BACK</h5>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            type="email"
            id="email"
            label="Email"
            name="email"
            margin="normal"
            variant="filled"
            required
            fullWidth
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormControl
            sx={{ width: "100%" }}
            variant="filled"
            className=" mt-2"
          >
            <InputLabel htmlFor="filled-adornment-password">
              Password
            </InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {/* <TextField
            type="password"
            id="password"
            label="Password"
            margin="normal"
            variant="filled"
            required
            fullWidth
            autoFocus
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          <Button
            type="submit"
            fullWidth
            className=" btn2"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
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

export default Login;
