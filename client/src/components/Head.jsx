import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Head() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Head;
