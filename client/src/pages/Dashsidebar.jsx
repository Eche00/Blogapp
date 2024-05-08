import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { Home, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Dashsidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className=" md:w-56">
      <Sidebar className=" w-full md:w-56">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to="/dashboard?tab=profile">
              <Sidebar.Item
                active={tab === "profile"}
                icon={Home}
                label="User"
                labelColor="dark">
                Profile
              </Sidebar.Item>
            </Link>
            <Sidebar.Item icon={Logout} className=" cursor-pointer">
              Sign up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default Dashsidebar;
