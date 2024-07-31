import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dashprofile from "./Dashprofile";
import Dashsidebar from "./Dashsidebar";
import Dashuser from "./Dashuser";

import Posts from "./Posts";

function Dashboard() {
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
    <div className=" min-h-screen flex flex-col md:flex-row">
      {/* Dashboard */}

      {/* ALL PAGE 1 */}
      <Dashsidebar />

      {/* ALL PAGE 2 */}
      {
        // profile tab
        tab === "profile" && <Dashprofile />
      }
      {
        // posts tab
        tab === "posts" && <Posts />
      }
      {
        // users tab
        tab === "dashuser" && <Dashuser />
      }
    </div>
  );
}

export default Dashboard;
