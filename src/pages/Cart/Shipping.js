import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useNavigate } from "react-router-dom";

import {
  selectShippingInfo,
  saveShippingInfo,
} from "../../redux/features/shippingSlice";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { Box, TextField, Button, TextareaAutosize, Grid } from "@mui/material";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shipInfo } = useSelector(selectShippingInfo);

  const [address, setAddress] = useState(shipInfo.address || "");
  const [city, setCity] = useState(shipInfo.city || "");
  const [zipCode, setZipCode] = useState(shipInfo.zipCode || "");
  const [state, setState] = useState(shipInfo.state || "");
  const [country, setCountry] = useState(shipInfo.country || "");
  const [phone, setPhone] = useState(shipInfo.phone || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({ address, phone, city, zipCode, state, country })
    );
    navigate("/confirm-order");
  };
  return (
    <Box
      className=" box-shadow mt-5 mb-5"
      sx={{
        m: "0 auto",
        textAlign: "center",
        maxWidth: "450px",
        padding: "25px",
      }}
    >
      <h3 className=" logo mb-2" style={{ margin: "0 auto" }}>
        MOHAMED
      </h3>
      <h4 className=" mb-3">Shipping Information</h4>
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 1 }}>
        <TextareaAutosize
          required
          aria-label="address"
          minRows={5}
          placeholder="Address"
          value={address}
          style={{
            width: "100%",
            marginTop: "16px",
            borderRadius: "10px",
            padding: "15px",
            borderColor: "#ccc",
            resize: "none",
          }}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          type="text"
          id="phone"
          label="Phone"
          name="phone"
          variant="filled"
          margin="normal"
          required
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              type="text"
              id="city"
              label="City"
              name="city"
              variant="filled"
              margin="normal"
              required
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              id="zipCode"
              label="Zip"
              variant="filled"
              name="zipCode"
              margin="normal"
              required
              fullWidth
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CountryDropdown
              classes="ship-drop-down"
              defaultOptionLabel="Select a coutry"
              style={{ width: "100%" }}
              value={country}
              variant="filled"
              valueType="short"
              priorityOptions={["CA", "US", "IN", "GB"]}
              onChange={(e) => setCountry(e)}
            />
          </Grid>
          <Grid item xs={6}>
            <RegionDropdown
              classes="ship-drop-down"
              defaultOptionLabel="Now select a region"
              blankOptionLabel="No country selected"
              style={{ width: "100%" }}
              value={state}
              variant="filled"
              country={country}
              countryValueType="short"
              onChange={(e) => setState(e)}
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          className=" btn2"
          startIcon={<LocalShippingIcon />}
          sx={{ m: 4 }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default Shipping;
