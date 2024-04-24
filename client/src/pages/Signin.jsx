import React from "react";
import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

function Signin() {
  return (
    <div className=" min-h-screen mt-20">
      <div className=" flex p-3 max-w-3xl mx-auto md:flex-row flex-col md:items-center gap-5">
        {/*left */}
        <div className=" flex-1">
          <Link
            to="/"
            className=" self-center whitespace-nowrap text-xl font-bold dark:text-white">
            <span className=" p-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white dark:text-black">
              𝕏
            </span>{" "}
            -ßlog
          </Link>
          <p className=" text-sm mt-5 text-black dark:text-white font-semibold">
            This is a demo project, you can sign in with inactive email and
            password, or with Google..
          </p>
        </div>
        {/*right */}
        <div className=" flex-1">
          <form className=" flex flex-col gap-4">
            <div>
              <Label value="Your Email" />
              <TextInput type="text" placeholder="email" id="email" />
            </div>{" "}
            <div>
              <Label value="Your Password" />
              <TextInput type="text" placeholder="password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>
          <div>
            <span className=" flex text-sm gap-4 my-5 font-bold dark:text-white">
              Don't have an account ?{" "}
              <Link
                className=" text-blue-500 hover:underline font-semibold"
                to="/signup">
                signup
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
