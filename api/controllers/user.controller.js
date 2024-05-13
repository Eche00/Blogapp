import User from "../modules/user.module.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const testControls = (req, res) => {
  res.json({ message: "api active" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 6 || req.body.username.length > 15) {
      return next(
        errorHandler(
          400,
          "Username must be at least min of 6 & max of 15 characters"
        )
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "username must be lowercase"));
    }
    if (!req.body.username.match(/[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "username contains only letters and numbers")
      );
    }
  }
  if (req.body.bio) {
    if (req.body.bio.length < 20 || req.body.bio.length > 100) {
      return next(
        errorHandler(
          400,
          "Username must be at least min of 20 & max of 100 characters"
        )
      );
    }
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          bio: req.body.bio,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
