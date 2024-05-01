import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Head() {
  return (
    <div className=" flex flex-col  ">
      <div className="flex flex-col   h-screen">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Head;
