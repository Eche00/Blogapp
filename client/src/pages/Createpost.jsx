import React, { useState } from "react";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Createpost() {
  const [formD, setFormD] = useState({});
  const [file, setFile] = useState(null);
  const [imgUpldS, setImgUpldS] = useState(null);
  const [imgUpldE, setImgUpldE] = useState(null);

  const handleImgUpload = async (e) => {
    e.preventDefault();
    try {
      if (!file) {
        setImgUpldE("Please select an image");
        return;
      }
      setImgUpldE(null);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImgUpldS(progress.toFixed(0));
        },
        (error) => {
          setImgUpldE("Could not upload image");
          setImgUpldS(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUpldE(null);
            setImgUpldS(null);
            setFormD({ ...formD, image: downloadURL });
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

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
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              disabled={imgUpldS}
              onClick={handleImgUpload}
              outline>
              {imgUpldS ? (
                <div className=" w-16 h-16">
                  <CircularProgressbar
                    value={imgUpldS}
                    text={`${imgUpldS || 0}%`}
                  />
                </div>
              ) : (
                "Upload image"
              )}
            </Button>
          </div>
          {imgUpldE && (
            <Alert color="failure" className="my-2 ">
              {imgUpldE}
            </Alert>
          )}
          {formD.image && (
            <img
              src={formD.image}
              alt="uploaded"
              className=" w-full h-72 object-cover"
            />
          )}
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
