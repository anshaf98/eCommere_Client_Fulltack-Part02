import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { selectLoggedInUser } from "../../redux/features/authSlice";

import Loading from "../Loading/Loading";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (!accessToken) {
      navigate("/auth");
    }
  }, [accessToken, navigate]);
  return accessToken ? <Outlet /> : <Loading />;
};

export default ProtectedRoute;
