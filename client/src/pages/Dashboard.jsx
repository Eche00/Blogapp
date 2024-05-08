import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dashprofile from "./Dashprofile";
import Dashsidebar from "./Dashsidebar";

function Dashboard() {
  const location = useLocation();
  const [tab, useTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl);
  }, [location.search]);

  return (
    <div className="flex">
      {/* Dashboard */}

      {/* ALL PAGE 1 */}
      <Dashsidebar />

      {/* ALL PAGE 2 */}
      <Dashprofile />
    </div>
  );
}

export default Dashboard;
