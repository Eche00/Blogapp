import { Google } from "@mui/icons-material";
import { Button } from "flowbite-react";
import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    try {
      // importing google provider
      const Gprovider = new GoogleAuthProvider();
      Gprovider.setCustomParameters({ prompt: "select_account" });
      // importing app from firestore config

      const auth = getAuth(app);
      // signing in with google google pop up

      const result = await signInWithPopup(auth, Gprovider);
      // sending response of information needed to the backend

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      // converting data to json and making use of dispatch

      const data = await res.json();

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      // error msg
      console.log("Could not sign in with google auth", error);
    }
  };
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleAuth}>
      <Google />
    </Button>
  );
}

export default Oauth;
