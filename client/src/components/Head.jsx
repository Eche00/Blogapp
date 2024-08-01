import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Head() {
  return (
    <div className=" flex flex-col  ">
      <Header />
      <div className="sm:pb-5 pb-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Head;
