import React, { useEffect, useState } from "react";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
//import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Editpost() {
  const [formD, setFormD] = useState({});
  const [file, setFile] = useState(null);
  const [imgUpldS, setImgUpldS] = useState(null);
  const [imgUpldE, setImgUpldE] = useState(null);
  const [pubE, setPubE] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    try {
      const getPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPubE(data.message);
          return;
        }
        if (res.ok) {
          setPubE(null);

          setFormD(data.posts[0]);
        }
      };
      getPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/updatepost/${formD._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formD),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPubE(data.message);
        return;
      }
      if (res.ok) {
        setPubE(null);
        navigate(`/post${data.slug}`);
      }
    } catch (error) {
      setPubE("Something went wrong");
    }
  };

  return (
    <div>
      <div className=" max-w-3xl mx-auto p-3 ">
        <h1 className=" text-center  text-3xl font-serif sm:pt-10 pt-5 font-bold">
          Edit Post
        </h1>
        <form className=" flex flex-col gap-4 my-20" onSubmit={handleSubmit}>
          <div className=" flex flex-col sm:flex-row gap-4 justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              id="title"
              className="flex-1"
              required
              value={formD.title}
              onChange={(e) => setFormD({ ...formD, title: e.target.value })}
            />
            <Select
              onChange={(e) => setFormD({ ...formD, category: e.target.value })}
              value={formD.category}>
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
          {/*  <ReactQuill
            theme="snow"
            placeholder="Write your article..."
            className=" h-80 mb-12"
            required
            onChange={(value) => setFormD({ ...formD, content: value })}
        />*/}
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(e) => setFormD({ ...formD, content: e.target.value })}
            required
            placeholder="Write your article..."
            className=" bg-transparent border-gray-700 dark:border-gray-400 border-1"
            value={formD.content}></textarea>

          <Button
            type="submit"
            gradientDuoTone="purpleToPink"
            className=" my-12 sm:my-0">
            Update Post
          </Button>
          {pubE && (
            <Alert color="failure" className="my-2  z-10">
              {pubE}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
export default Editpost;
