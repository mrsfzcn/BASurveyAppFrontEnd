import { Outlet, Navigate } from "react-router-dom";
import { decrypt } from "./encrypt.js";
import LocalStorageServiceAuth from "../store/auth-store"

const PrivateRoutes = ({ children, ...rest }) => {
  let auth = LocalStorageServiceAuth.getIsAuthenticated();

  if (!auth) {
    return <Navigate to="/giris" />;
  }

  return decrypt(auth) === "true" ? <Outlet /> : <Navigate to="/giris" />;
};

export default PrivateRoutes;
