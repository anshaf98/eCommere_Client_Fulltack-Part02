import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import { Link } from "react-router-dom";
import { IMAGE_BASEURL } from "../../../constants/baseURL";
import { DateFormat } from "../../DateNDUppercase";

export const LatestUser = ({ users, sx }) => {
  return (
    <Card sx={sx}>
      <CardHeader title="Latest users" />
      <List>
        {users.slice(0, 5).map((user, index) => {
          const hasDivider = index < user.length - 1;
          const ago = DateFormat(user.createdAt);

          return (
            <ListItem divider={hasDivider} key={user?._id}>
              <ListItemAvatar>
                <Box
                  component="img"
                  src={IMAGE_BASEURL + user?.avatar?.url}
                  sx={{
                    borderRadius: 1,
                    height: 48,
                    width: 48,
                    objectFit: "cover",
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondary={`Created ${ago}`}
                secondaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Link to="/authorized/userlist" className=" text-dark">
          <Button
            color="inherit"
            endIcon={
              <SvgIcon fontSize="small">
                <ArrowForwardIcon />
              </SvgIcon>
            }
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
