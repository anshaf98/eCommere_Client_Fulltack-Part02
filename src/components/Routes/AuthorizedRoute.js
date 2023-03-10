import { useSelector } from "react-redux";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

import { selectLoggedInUser } from "../../redux/features/authSlice";
import jwtDecode from "jwt-decode";

//

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PixIcon from "@mui/icons-material/Pix";
import StoreIcon from "@mui/icons-material/Store";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ReviewsIcon from "@mui/icons-material/Reviews";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import { Tooltip } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AuthorizedRoute = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { accessToken } = useSelector(selectLoggedInUser);
  let role;
  const { UserInfo } = jwtDecode(accessToken);
  role = UserInfo.roles[0].toString();

  const navigate = useNavigate();

  const goto = (page) => {
    navigate("/authorized/" + page);
  };

  //

  if (role === "admin" || role === "seller") {
    return (
      <>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Deshboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <Tooltip title="Dashboard" followCursor>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => goto("dashboard")}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {<DashboardIcon />}
                    </ListItemIcon>
                    <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                      Dashboard
                    </ListItemText>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <Tooltip title="Products List" followCursor>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => goto("productlist")}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {<ShoppingCartIcon />}
                    </ListItemIcon>
                    <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                      Products
                    </ListItemText>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <Tooltip title="Categories List" followCursor>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => goto("categorylist")}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {<CategoryIcon />}
                    </ListItemIcon>
                    <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                      Categories
                    </ListItemText>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <Tooltip title="Brands List" followCursor>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => goto("brandlist")}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {<PixIcon />}
                    </ListItemIcon>
                    <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                      Brands
                    </ListItemText>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <Tooltip title="Stores List" followCursor>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => goto("storelist")}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {<StoreIcon />}
                    </ListItemIcon>
                    <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                      Stores
                    </ListItemText>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <Tooltip title="Orders List" followCursor>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => goto("orderlist")}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {<ListAltIcon />}
                    </ListItemIcon>
                    <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                      Orders
                    </ListItemText>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <Tooltip title="Users List" followCursor>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => goto("userlist")}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {<SupervisedUserCircleIcon />}
                    </ListItemIcon>
                    <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                      Users
                    </ListItemText>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <Tooltip title="Reviews" followCursor>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => goto("reviewlist")}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {<ReviewsIcon />}
                    </ListItemIcon>
                    <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                      Reviews
                    </ListItemText>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <Tooltip title="Banners List" followCursor>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => goto("bannerlist")}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {<ViewCarouselIcon />}
                    </ListItemIcon>
                    <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                      Banners
                    </ListItemText>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <Tooltip title="Offers List" followCursor>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => goto("offerlist")}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {<LocalOfferIcon />}
                    </ListItemIcon>

                    <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                      Offers
                    </ListItemText>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3, height: "200vh" }}>
            <DrawerHeader />
            <Outlet />
          </Box>
        </Box>
      </>
    );
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default AuthorizedRoute;
