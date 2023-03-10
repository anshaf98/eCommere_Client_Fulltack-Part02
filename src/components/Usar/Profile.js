import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./Profile.css";

import Welcome from "./Welcome";
import Title from "./../Title/Title";
import ProfileDetails from "./ProfileDetails";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Profile = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    if (index > 1) {
      index = 1;
    }
    setValue(index);
  };

  return (
    <>
      <Title title="My Account" />
      <Box
        sx={{
          bgcolor: "background.paper",
          maxWidth: 900,
          margin: "0 auto",
          padding: "5px",
        }}
        className="box-shadow mt-5 mb-5"
      >
        <AppBar
          position="static"
          style={{ background: "#111", borderRadius: "10px" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="none"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Welcome" {...a11yProps(0)} />
            <Tab label="My Account OR Profile Details" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Welcome />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <ProfileDetails />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  );
};

export default Profile;
