import { Outlet, Navigate } from "react-router-dom";
import { decrypt } from "./encrypt.js";

const PrivateRoutes = ({ children, ...rest }) => {
  let auth = localStorage.getItem("auth");

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return decrypt(auth) === "true" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
