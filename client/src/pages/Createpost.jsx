import React, { useState } from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Createpost() {
  const [formD, setFormD] = useState({});
  return (
    <div>
      <div className=" max-w-3xl mx-auto p-3 ">
        <h1 className=" text-center  text-3xl font-serif sm:pt-10 pt-5 font-bold">
          Create Post
        </h1>
        <form className=" flex flex-col gap-4 my-20">
          <div className=" flex flex-col sm:flex-row gap-4 justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              id="title"
              className="flex-1"
              required
            />
            <Select>
              <option value="uncategorized">Select a category</option>
              <option value="javascript">Javascript</option>
              <option value="typescript">Typescript</option>
              <option value="react">React</option>
              <option value="nextjs">Next.Js</option>
              <option value="nodejs">Node.Js</option>
              <option value="php">PHP</option>
              <option value="css">CSS</option>
              <option value="tailwind">Tailwind</option>
            </Select>
          </div>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput type="file" accept="image/*" />
            <Button type="button" gradientDuoTone="purpleToBlue" size="sm">
              Upload image
            </Button>
          </div>
          <ReactQuill
            theme="snow"
            placeholder="Write your article..."
            className=" h-80 mb-12"
            required
          />
          <Button
            type="submit"
            gradientDuoTone="purpleToPink"
            className=" my-12 sm:my-0">
            Publish
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Createpost;
