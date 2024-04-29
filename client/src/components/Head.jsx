import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Head() {
  return (
    <div className=" flex flex-col  ">
      <Header />
      <div className="flex flex-col justify-between  h-screen">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default Head;
