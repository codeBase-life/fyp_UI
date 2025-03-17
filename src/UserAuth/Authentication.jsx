import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../Context/useAppContext";

const Authentication = () => {
  const { user } = useAppContext();

  if (user !== true) {
    return <Navigate to="/user" replace />;
  }

  return <Outlet />;
};

export default Authentication;
