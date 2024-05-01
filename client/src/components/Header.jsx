import React from "react";
import { Navbar, TextInput, Button, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { SearchOutlined, WbSunny, DarkMode } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
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
        <Button
          className=" hidden sm:inline rounded-full"
          color="gray"
          onClick={() => dispatch(toggleTheme())}>
          {theme === "light" ? (
            <WbSunny fontSize="small" />
          ) : (
            <DarkMode fontSize="small" />
          )}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user avatar " img={currentUser.avatar} rounded />
            }>
            <Dropdown.Header className="truncate font-semibold text-sm">
              {currentUser.username}
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signup">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign in
            </Button>
          </Link>
        )}
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
