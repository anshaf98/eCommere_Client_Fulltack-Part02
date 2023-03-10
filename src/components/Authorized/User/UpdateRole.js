import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getUserDetails,
  selectUserDetails,
  updateUserRole,
  selectMutationResult,
  resetMutationResult,
} from "../../../redux/features/authSlice";
import { getStores, selectAllStores } from "../../../redux/features/storeSlice";
import { IMAGE_BASEURL } from "../../../constants/baseURL";

import {
  Box,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { DateFormat } from "../../DateNDUppercase";

const UpdateRole = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [blocked, setBlocked] = useState("");
  const [store, setStore] = useState("");
  const { user, isLoading } = useSelector(selectUserDetails);
  const { stores } = useSelector(selectAllStores);
  const { success } = useSelector(selectMutationResult);

  const submitHandler = (e) => {
    e.preventDefault();

    if (role === "seller" && store === "") {
      toast.error("Please select a store");
      return;
    }

    const jsonData = {
      roles: role,
      store,
      blocked,
    };

    dispatch(updateUserRole({ id, jsonData, toast }));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
    }

    dispatch(getUserDetails({ id, toast }));
    dispatch(getStores({ toast }));
    // }, [id, dispatch]);
  }, [id, dispatch, success]);

  useEffect(() => {
    setRole(user?.roles);
    setBlocked(user?.blocked);

    // user?.roles[0] === "seller" || user?.roles === "seller"
    // user?.roles[0] === "seller" ? setStore(user?.store) : setStore("");
  }, [user]);

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
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <h3 className=" text-capitalize mb-3">{user?.name} Deatil's</h3>
          <img
            src={IMAGE_BASEURL + user?.avatar?.url}
            alt=""
            className=" mb-3"
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              margin: "0 auto",
            }}
          />
        </Box>

        <Grid container sx={{ alignItems: "center", mt: 1 }}>
          <Grid item xs={6} className=" my-2">
            <h6>Username:</h6>
          </Grid>
          <Grid item xs={6} className=" my-2">
            <h6 className=" fw-bolder text-capitalize">{user?.name}</h6>
          </Grid>

          <Grid item xs={6} className=" my-2">
            <h6>User email:</h6>
          </Grid>
          <Grid item xs={6} className=" my-2">
            <h6 className=" fw-bolder">{user?.email}</h6>
          </Grid>

          <Grid item xs={6} className=" my-2">
            <h6>Joined date:</h6>
          </Grid>
          <Grid item xs={6} className=" my-2">
            <h6 className=" fw-bolder">{DateFormat(user?.createdAt)}</h6>
          </Grid>

          <Grid item xs={6} className=" my-2">
            <h6>User's Role:</h6>
          </Grid>
          <Grid item xs={6} className=" my-2">
            <h6 className=" fw-bolder">{user?.roles}</h6>
          </Grid>

          <Grid item xs={6} className=" my-2">
            <h6>User's Status:</h6>
          </Grid>
          <Grid item xs={6} className=" my-2">
            <h6>
              {user?.blocked ? (
                <div className=" text-danger">Blocked</div>
              ) : (
                <div className=" text-success">Active</div>
              )}
            </h6>
          </Grid>
        </Grid>

        <Divider />

        <Grid container sx={{ alignItems: "center", mt: 3 }}>
          <Grid item xs={6}>
            <h5>Change User's Status:</h5>
          </Grid>

          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="status">Status</InputLabel>
              <Select
                required
                labelId="status"
                id="status"
                value={blocked}
                label="Status"
                onChange={(e) => setBlocked(e.target?.value)}
              >
                <MenuItem value="true">Block</MenuItem>
                <MenuItem value="false">Active</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container sx={{ alignItems: "center", mt: 3 }}>
          <Grid item xs={6}>
            <h5>Change User's Role:</h5>
          </Grid>

          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="role">Role</InputLabel>
              <Select
                required
                labelId="role"
                id="role"
                value={role || ""}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {role === "seller" || role?.includes("seller") ? (
          <Grid container sx={{ alignItems: "center", mt: 3 }}>
            <Grid item xs={6}>
              <h5>Select Store :</h5>
            </Grid>

            <Grid item xs={6}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="store">Select Store</InputLabel>
                <Select
                  required
                  labelId="store"
                  id="store"
                  value={store || ""}
                  label="Store"
                  onChange={(e) => setStore(e.target.value)}
                >
                  {stores &&
                    stores?.map((st) => (
                      <MenuItem value={st?._id} key={st?._id}>
                        {st?.title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
        <Button
          className=" btn2"
          fullWidth
          dispatch={isLoading}
          // startIcon={<UpdateIcon />}
          sx={{ mt: 3, mb: 2 }}
          onClick={submitHandler}
        >
          {isLoading ? "Loading..." : "Change"}
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateRole;
