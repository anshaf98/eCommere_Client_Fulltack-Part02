import React, { useEffect } from "react";
import { getMyOrders, selectAllOrders } from "../../redux/features/orderSlice";
import Title from "../Title/Title";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { DateFormat, shortUppercaseId } from "../DateNDUppercase";
import { formatCurrency } from "../../utility/formatCurrency";

const Order = () => {
  const dispatch = useDispatch();
  const { loading, orders } = useSelector(selectAllOrders);
  useEffect(() => {
    dispatch(getMyOrders({ toast }));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Title title="My Orders" />

          <section class="user-dashboard page-wrapper">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="dashboard-wrapper user-dashboard">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Country</th>
                            <th>Address</th>
                            <th>Total Price</th>
                            <th>Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders &&
                            orders.map((order) => (
                              <tr>
                                <td>#{shortUppercaseId(order._id)}</td>
                                <td>{order?.shippingInfo?.country}</td>
                                <td>{order?.shippingInfo?.address}</td>
                                <td>{formatCurrency(order.totalPrice)}</td>
                                <td>{DateFormat(order.createdAt)}</td>
                                <td>
                                  <Link
                                    to={`/order/${order?._id}`}
                                    className="badge text-bg-dark"
                                  >
                                    View
                                  </Link>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Order;
