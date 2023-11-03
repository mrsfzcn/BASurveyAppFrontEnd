import { Outlet, Navigate } from "react-router-dom";
import { decrypt } from "./encrypt.js";

const PrivateRoutes = ({ children, ...rest }) => {
  let auth = localStorage.getItem("auth");

  if (!auth) {
    return <Navigate to="/giris" />;
  }

  return decrypt(auth) === "true" ? <Outlet /> : <Navigate to="/giris" />;
};

export default PrivateRoutes;
