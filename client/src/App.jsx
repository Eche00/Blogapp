import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Head from "./components/Head";
import Privateroute from "./components/Privateroute";
import Adminprivateroute from "./components/Adminprivateroute";
import Createpost from "./pages/Createpost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Head />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<Privateroute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<Adminprivateroute />}>
            <Route path="/create-post" element={<Createpost />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
