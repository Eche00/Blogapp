import React, { useEffect, useState } from "react";
import photo from "../assets/react.svg";
import { Avatar, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { Email, More, VerifiedUser, VisibilityOff } from "@mui/icons-material";

function Dashprofile() {
  const [loading, setLoading] = useState(false);
  const [editp, setEditp] = useState();

  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className=" w-full">
      <h1 className=" text-center  text-3xl font-serif sm:pt-10 pt-5">
        PROFILE
      </h1>{" "}
      <div className="flex flex-col items-center justify-center sm:flex-row max-w-7xl mx-auto px-5 md:px-0 sm:py-20 gap-3 ">
        {/* DETAILS SECTION */}
        <div className=" flex sm:w-[400px]  flex-col  gap-5  rounded-lg border-[2px] border-gray-400  dark:border-purple-400 px-4 sm:my-0 my-12 pt-24">
          <div className=" w-full flex items-center justify-center">
            {" "}
            <Avatar
              size="xl"
              className="bg-black rounded-full my-3  object-center w-fit overflow-hidden object-cover border-8 dark:border-purple-400 border-gray-400"
              img={currentUser.avatar}
            />
          </div>
          <div className=" flex flex-col gap-3">
            <p className=" text-3xl font-semibold  font-serif">
              {currentUser.username}
            </p>

            <p className=" w-fit text-md font-light">
              <span className=" font-bold">
                bio: <br />
              </span>

              {currentUser.bio}
            </p>

            <p className="text-sm font-light  bg-gray-200 dark:bg-transparent border border-gray-200 rounded-md p-2">
              <span className=" font-bold">
                email: <br />
              </span>

              {currentUser.email}
            </p>

            <Button
              onClick={() => setEditp(!editp)}
              className=" my-3 text-md font-bold"
              gradientDuoTone="purpleToBlue"
              outline>
              {editp === true ? <p>Cancel</p> : <p>Edit profile</p>}
            </Button>
          </div>
          {editp === true && (
            <div className=" flex items-center justify-between text-red-600 w-full font-bold text-sm py-2">
              <button>Delete account</button>
              <button>Logout</button>
            </div>
          )}
        </div>
        {/* Edit profile section */}

        {editp && (
          <div className="flex flex-1 w-full sm:py-0 py-10">
            <form className=" flex flex-col gap-4 w-full">
              <h1 className=" text-center font-semibold text-lg pb-2">
                Edit Profile
              </h1>
              <div>
                <Label value="Username" />
                <TextInput
                  rightIcon={VerifiedUser}
                  type="text"
                  id="username"
                  defaultValue={currentUser.username}
                />
              </div>
              <div>
                <Label value="Email" />
                <TextInput
                  rightIcon={Email}
                  type="email"
                  id="email"
                  defaultValue={currentUser.email}
                />
              </div>{" "}
              <div>
                <Label value="Bio" />
                <TextInput
                  rightIcon={More}
                  type="bio"
                  id="bio"
                  defaultValue={currentUser.bio}
                />
              </div>
              <div>
                <Label value="Password" />
                <TextInput
                  rightIcon={VisibilityOff}
                  type="password"
                  id="password"
                  placeholder="***************"
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
                  "Update"
                )}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashprofile;
