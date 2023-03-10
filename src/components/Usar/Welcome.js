import React, { useEffect } from "react";
import { IMAGE_BASEURL } from "../../constants/baseURL";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../redux/features/authSlice";
import { getMyOrders, selectAllOrders } from "../../redux/features/orderSlice";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { DateFormat, shortUppercaseId } from "../DateNDUppercase";
import { formatCurrency } from "../../utility/formatCurrency";

const Welcome = () => {
  const { user } = useSelector(selectLoggedInUser);
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
          {/*  */}
          <section className="user-dashboard">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="dashboard-wrapper user-dashboard">
                    <div className="media">
                      <div className="pull-left mb-2">
                        <img
                          className="media-object user-img"
                          src={IMAGE_BASEURL + user.avatar.url}
                          alt=""
                        />
                      </div>
                      <div className="media-body">
                        <h2 className="media-heading">Welcome {user.name}</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Unde, iure, est. Sit mollitia est maxime! Eos
                          cupiditate tempore, tempora omnis. Lorem ipsum dolor
                          sit amet, consectetur adipisicing elit. Enim, nihil.
                        </p>
                      </div>
                    </div>
                    <div className="total-order mt-20">
                      <h4>Total Orders</h4>
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>Qty</th>
                              <th>Price</th>
                              <th>Date</th>
                              <th>Shipping Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders &&
                              orders?.map((order) => (
                                <tr>
                                  <td>#{shortUppercaseId(order._id)}</td>
                                  <td>{order.orderItems.length}</td>
                                  <td>{formatCurrency(order.totalPrice)}</td>
                                  <td>{DateFormat(order.createdAt)}</td>
                                  <td>{formatCurrency(order.shippingPrice)}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
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

export default Welcome;
