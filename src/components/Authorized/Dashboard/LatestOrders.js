import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Link,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DateFormat, shortUppercaseId } from "../../DateNDUppercase";

export const LatestOrders = ({ orders, sx }) => {
  return (
    <Card sx={sx}>
      <CardHeader title="Latest Orders" />
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Address</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>PaymentID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              // const createdAt = format(order.createdAt, 'dd/MM/yyyy');

              return (
                <TableRow hover key={order._id}>
                  <TableCell>{shortUppercaseId(order._id)}</TableCell>
                  <TableCell>{order.shippingInfo.address}</TableCell>
                  <TableCell>{DateFormat(order.createdAt)}</TableCell>
                  <TableCell>
                    {shortUppercaseId(order.paymentInfo.id)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Link to="/authorized/orders" className=" text-dark">
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
