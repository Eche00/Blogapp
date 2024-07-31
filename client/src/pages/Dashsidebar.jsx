import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { GroupOutlined, Home, Logout, PostAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { signOutUserSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Dashsidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutUserSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" md:w-56">
      <Sidebar className=" w-full md:w-56">
        <Sidebar.Items>
          <Sidebar.ItemGroup className=" flex flex-col gap-1">
            <Link to="/dashboard?tab=profile">
              <Sidebar.Item
                active={tab === "profile"}
                icon={Home}
                label={currentUser.isAdmin ? "Admin" : "User"}
                labelColor="dark"
                as="div">
                Profile
              </Sidebar.Item>
            </Link>
            {currentUser.isAdmin && (
              <Link to="/dashboard?tab=posts">
                <Sidebar.Item
                  active={tab === "posts"}
                  icon={PostAdd}
                  labelColor="dark"
                  as="div">
                  Posts
                </Sidebar.Item>
              </Link>
            )}
            {currentUser.isAdmin && (
              <Link to="/dashboard?tab=dashuser">
                <Sidebar.Item
                  active={tab === "dashuser"}
                  icon={GroupOutlined}
                  labelColor="dark"
                  as="div">
                  Users
                </Sidebar.Item>
              </Link>
            )}
            <Sidebar.Item
              icon={Logout}
              className=" cursor-pointer"
              onClick={handleSignOut}>
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default Dashsidebar;
