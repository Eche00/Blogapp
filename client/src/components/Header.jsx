import React from "react";
import { Navbar, TextInput, Button } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { SearchOutlined, WbSunny } from "@mui/icons-material";

function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className="border border-b-2">
      {/*LOGO*/}
      <Link
        to="/"
        className=" self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        <span className=" p-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white dark:text-black">
          𝕏
        </span>{" "}
        -ßlog
      </Link>

      {/*SEARCH BOX*/}

      <form>
        <TextInput
          type="text"
          placeholder="search.."
          rightIcon={SearchOutlined}
          className=" hidden sm:inline"
        />
      </form>
      <Button className=" sm:hidden inline rounded-full" color="gray">
        <SearchOutlined fontSize="small" />
      </Button>

      {/*MODE & SIGNIN */}

      <section className="flex items-center gap-2  md:order-2">
        <Button className=" hidden sm:inline rounded-full" color="gray">
          <WbSunny fontSize="small" />
        </Button>
        <Link to="/signup">
          <Button gradientDuoTone="purpleToBlue" outline>
            Sign in
          </Button>
        </Link>
        <Navbar.Toggle />
      </section>
      {/*NAVBAR */}

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
