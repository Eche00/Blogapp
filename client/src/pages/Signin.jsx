import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import {
  signInFaliure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "./Oauth";

function Signin() {
  const [formD, setFormD] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //adding onchange func to handle formdata from the input

  const handleChange = (e) => {
    setFormD({ ...formD, [e.target.id]: e.target.value });
  };
  // handling formD submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formD.email || !formD.password) {
      return dispatch(signInFaliure("Please fill out all fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formD),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFaliure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFaliure(error.message));
    }
  };
  return (
    <div className=" min-h-fit mt-20 ">
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
            This is a demo project, you can sign in with created email and
            password, or with Google...
          </p>
        </div>
        {/*right */}
        <div className=" flex-1">
          <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                onChange={handleChange}
                type="email"
                placeholder="email"
                id="email"
              />
            </div>{" "}
            <div>
              <Label value="Your Password" />
              <TextInput
                onChange={handleChange}
                type="password"
                placeholder="password"
                id="password"
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className=" pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <Oauth />
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
          {errorMessage && (
            <Alert className=" mt-5  text-sm " color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signin;
