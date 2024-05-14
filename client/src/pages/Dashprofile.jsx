import React, { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  Alert,
  Avatar,
  Button,
  Label,
  Modal,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import {
  Email,
  More,
  VerifiedUser,
  VisibilityOff,
  Warning,
} from "@mui/icons-material";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateUserStart,
  updateUserFaliure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteeUserFaliure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

function Dashprofile() {
  const [loadingim, setLoading] = useState(false);
  const [updateUserS, setUpdateUserS] = useState(null);
  const [updateUserErr, setUpdateUserErr] = useState(null);

  const [editp, setEditp] = useState();
  const [imageF, setImageFile] = useState(null);
  const [imageFUrl, setImageFileUrl] = useState(null);
  const [imageFUploading, setImageFUploading] = useState(null);
  const [imageFError, setImageFError] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const avatarRef = useRef(null);
  // handliing image selecting
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  // accessing image change only  on edit profile
  const test = () => {
    if (editp === true) {
      avatarRef.current.click();
    }
  };
  // useeffect for showing loaded image on web load
  useEffect(() => {
    setEditp(false);
    if (imageF) {
      uploadImage();
    }
  }, [imageF]);
  // handliing uploading image to firebase
  const uploadImage = async () => {
    setEditp(true);

    // service firebase.storage {
    // match /b/{bucket}/o {
    // match /{allPaths=**} {
    // allow read;
    //allow write: if
    //request.resource.size < 2 * 1024 * 1024 &&
    //request.resource.contentType.matches('image/.*')
    //}
    //}
    //}
    setLoading(true);
    setImageFError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageF.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageF);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFUploading(progress.toFixed(0));
      },
      (error) => {
        setImageFError("Could not upload image (file must be less than 2MB)");
        setImageFUploading(null);
        setImageFile(null);
        setImageFileUrl(null);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);

          setFormData({ ...formData, avatar: downloadURL });
          setLoading(false);
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserErr(null);
    setUpdateUserS(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserErr("No changes made");
      return;
    }
    if (loadingim) {
      setLoading("please wait for image to upload");
      return;
    }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(data.message);

        dispatch(updateUserFaliure(data.message));
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateUserS("User profile updates successfully !");
      }
    } catch (error) {
      dispatch(updateUserFaliure(error.message));
      setLoading(error.message);
    }
  };

  const handleDelete = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteeUserFaliure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteeUserFaliure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutUserSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" w-full ">
      <h1 className=" text-center  text-3xl font-serif sm:pt-10 pt-5 font-bold">
        PROFILE
      </h1>{" "}
      <div className="flex flex-col items-center justify-center lg:flex-row  max-w-7xl mx-auto px-5 md:px-0 sm:py-20 gap-3 ">
        {/* DETAILS SECTION */}
        <div className=" flex md:w-[400px] w-full  flex-col  gap-5  rounded-lg border-[2px] border-gray-400  dark:border-purple-400 px-4 sm:my-0 my-12 pt-24">
          <div className=" w-full flex items-center justify-center flex-col relative ">
            {" "}
            <div
              className={` w-fit border-8 dark:border-purple-400 border-gray-400 rounded-full overflow-hidden object-center ${
                editp === true && "cursor-pointer"
              }`}
              onClick={() => test()}>
              {imageFUploading && (
                <CircularProgressbar
                  className=" w-fit z-10"
                  value={imageFUploading || 0}
                  text={`${imageFUploading}%`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    },
                    path: {
                      stroke: `rgba(62,152,199,${imageFUploading / 100})`,
                    },
                  }}
                />
              )}
              <Avatar
                size="xl"
                rounded
                className={` object-fill ${
                  imageFUploading && imageFUploading < 100 && "opacity-60"
                } `}
                img={imageFUrl || currentUser.avatar}
              />
            </div>
            {imageFError && (
              <Alert color="failure" className="my-2 ">
                {imageFError}
              </Alert>
            )}
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
            {currentUser.isAdmin === true && editp === false && (
              <Link to="/create-post">
                <Button
                  onClick={() => setEditp(!editp)}
                  className=" mb-3 text-md font-bold w-full"
                  gradientDuoTone="purpleToPink">
                  Make a post
                </Button>
              </Link>
            )}
          </div>
          {editp === true && (
            <div className=" flex items-center justify-between text-red-600 w-full font-bold text-sm py-2">
              <button onClick={() => setShowModal(true)}>Delete account</button>
              <button onClick={handleSignOut}>Sign out</button>
            </div>
          )}
        </div>
        {/* Edit profile section */}

        {editp && (
          <div className="flex flex-1 w-full sm:py-0 lg:px-0 px-3 py-10">
            <form
              className=" flex flex-col gap-4 w-full"
              onSubmit={handleSubmit}>
              <h1 className=" text-center text-2xl font-semibold  font-serif pb-2 ">
                Edit Profile
              </h1>
              <div>
                <p className=" text-sm  font-bold">
                  Click profile picture to select image..
                </p>
                <input
                  ref={avatarRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div>
                <Label value="Username" />
                <TextInput
                  rightIcon={VerifiedUser}
                  type="text"
                  id="username"
                  defaultValue={currentUser.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Email" />
                <TextInput
                  rightIcon={Email}
                  type="email"
                  id="email"
                  defaultValue={currentUser.email}
                  onChange={handleChange}
                />
              </div>{" "}
              <div>
                <Label value="Bio" />
                <TextInput
                  rightIcon={More}
                  type="bio"
                  id="bio"
                  defaultValue={currentUser.bio}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Password" />
                <TextInput
                  rightIcon={VisibilityOff}
                  type="password"
                  id="password"
                  placeholder="***************"
                  onChange={handleChange}
                />
              </div>
              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                disabled={loadingim || loading}>
                {loadingim ? (
                  <>
                    <Spinner size="sm" />
                    <span className=" pl-3">Loading...</span>
                  </>
                ) : (
                  "Update"
                )}
              </Button>
              {updateUserErr && (
                <Alert color="failure" className="my-3 ">
                  {updateUserErr}
                </Alert>
              )}
              {updateUserS && (
                <Alert color="success" className="my-3 ">
                  {updateUserS}
                </Alert>
              )}
              {error && (
                <Alert color="failure" className="my-3 ">
                  {error}
                </Alert>
              )}
            </form>
          </div>
        )}
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md">
        <Modal.Header />
        <Modal.Body>
          <div className=" text-center text-gray-400 dark:text-gray-200 my-4 mx-auto">
            <Warning fontSize="large" />
            <h3 className=" font-semibold text-gray-500 dark:text-gray-400 text-lg text-center my-4">
              Are you sure you want to delete your account ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, i'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Dashprofile;
