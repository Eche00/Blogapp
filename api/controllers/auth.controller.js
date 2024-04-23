import User from "../modules/user.module.js";
import bcryptjs from "bcryptjs";

export const signUp = async (res, req) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    req.status(500).json({ message: error.message });
  }
};
