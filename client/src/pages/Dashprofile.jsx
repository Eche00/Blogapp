import React, { useEffect, useState } from "react";
import photo from "../assets/react.svg";
import { Avatar, Button, Label, Spinner, TextInput } from "flowbite-react";

function Dashprofile() {
  const [loading, setLoading] = useState(false);
  const [editp, setEditp] = useState();
  return (
    <div>
      {" "}
      <div className="flex flex-col items-center justify-center sm:flex-row max-w-[1500px] mx-auto px-5 md:px-0 sm:py-40 gap-3 ">
        {/* DETAILS SECTION */}

        <div className=" flex  flex-col items-center justify-center gap-5 sm:w-[30%] rounded-lg border-[2px] border-gray-400  dark:border-purple-400 px-4 sm:my-0 my-12 pt-24">
          <Avatar
            size="xl"
            className="bg-black rounded-full my-3 "
            img={photo}
          />
          <div className=" flex flex-col gap-3">
            <p className=" text-3xl font-semibold  font-serif">eche-codes</p>

            <p className=" w-fit text-md font-light">
              <span className=" font-bold">
                bio: <br />
              </span>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, cum
              recusandae voluptates doloremque explicabo non vero maxime
              cupiditate repudiandae impedit. Aperiam delectus dignissimos quo
              consequuntur, magni facilis officia perferendis sunt!
            </p>

            <p className="text-sm font-light ">
              <span className=" font-bold">
                email: <br />
              </span>
              email@gmail.com
            </p>

            <Button
              onClick={() => setEditp(!editp)}
              className=" my-3 text-md font-bold"
              gradientDuoTone="purpleToBlue"
              outline>
              {editp === true ? <p>Cancel</p> : <p>Edit profile</p>}
            </Button>
          </div>
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
                <TextInput type="text" id="username" />
              </div>
              <div>
                <Label value="Email" />
                <TextInput type="email" id="email" />
              </div>{" "}
              <div>
                <Label value="Bio" />
                <TextInput type="bio" id="bio" />
              </div>
              <div>
                <Label value="Password" />
                <TextInput type="password" id="password" />
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
