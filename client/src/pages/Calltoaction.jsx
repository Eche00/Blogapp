import { Button } from "flowbite-react";
import React from "react";
import { Cimg } from "../assets";

function Calltoaction() {
  return (
    <div className=" flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl  rounded-br-3xl text-center">
      <div className="flex flex-col flex-1 justify-center">
        <h2 className=" text-2xl">Want to connect with Developer</h2>
        <p className=" text-gray-500 my-2">
          Check out my portfolio and connect with me on other apps
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className=" rounded-tl-xl rounded-bl-xl">
          <a href="" target="_blank" rel="noopener noreffer">
            My portfolio
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src={Cimg} alt="" />
      </div>
    </div>
  );
}

export default Calltoaction;
