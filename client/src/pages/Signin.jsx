import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";

function Signin() {
  const [formD, setFormD] = useState({});
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  console.log(formD);
  const navigate = useNavigate();
  //adding onchange func to handle formdata from the input

  const handleChange = (e) => {
    setFormD({ ...formD, [e.target.id]: e.target.value });
  };
  // handling formD submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formD.username || !formD.email || !formD.password) {
      return setErrMessage("Please fill out all fields");
    }
    try {
      setLoading(true);
      setErrMessage(null);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formD),
      });

      const data = await res.json();
      if (data.success === false) {
        return setErrMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/signin");
      }
    } catch (error) {
      setErrMessage(error.message);
      setLoading(false);
    }
  };
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
            This is a demo project, you can sign up with inactive email and
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
                "Sign Up"
              )}
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
          {errMessage && (
            <Alert className=" mt-5  text-sm " color="failure">
              {errMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signin;
