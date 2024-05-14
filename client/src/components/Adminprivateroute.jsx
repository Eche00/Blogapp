import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function Adminprivateroute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="signup" />
  );
}

export default Adminprivateroute;
