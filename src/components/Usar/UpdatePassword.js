import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Box, Typography, TextField, Button } from "@mui/material";
import {
  changePassword,
  resetMutationResult,
  selectMutationResult,
} from "../../redux/features/authSlice";
import { ArrowBackIos } from "@mui/icons-material";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success } = useSelector(selectMutationResult);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.warn("New & confirm password not matched.");
      return;
    }
    const jsonData = {
      newPassword,
      oldPassword,
    };
    dispatch(changePassword({ jsonData, toast }));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
      toast.success("Profile Update Successfully");

      navigate("/profile");
    }
  }, [success, navigate, dispatch]);

  return (
    <Box
      sx={{
        maxWidth: "500px",
        m: "0 auto",
        display: "flex",
        flexGrow: 1,
        padding: "20px",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        marginTop: "80px",
        marginBottom: "80px",
      }}
      className=" box-shadow"
    >
      <Box sx={{ m: 1 }}>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            type="password"
            id="oldPassword"
            label="Old Password"
            name="oldPassword"
            variant="filled"
            margin="normal"
            required
            fullWidth
            autoFocus
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            type="password"
            id="newPassword"
            label="New Password"
            name="newPassword"
            variant="filled"
            margin="normal"
            required
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            variant="filled"
            margin="normal"
            required
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            className=" btn2"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? "Loading..." : <>Update Password</>}
          </Button>

          <div className=" text-startr">
            <Link
              to="/me/update"
              style={{
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                color: "#000",
              }}
            >
              {" "}
              <ArrowBackIos fontSize="10px" /> Back
            </Link>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdatePassword;
