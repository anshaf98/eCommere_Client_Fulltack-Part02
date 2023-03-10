import { useState } from "react";
// import { NavLink } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);

  const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: "#111111",
  }));

  return (
    <>
      <IconButton onClick={() => setOpen(true)} sx={{ color: "#fff" }}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => {}}
      >
        <StyledBox sx={{ width: "35vw", height: "100vh", color: "fff" }}>
          <Box className="mnwrapper" style={{ padding: "25px" }}>
            <a href="/">Home</a>
            <a href="/product">Shop</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </Box>
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
};

export default DrawerMenu;
