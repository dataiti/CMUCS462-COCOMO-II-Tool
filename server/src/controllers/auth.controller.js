const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const JWT = require("jsonwebtoken");

const generateAccessToken = (_id) => {
  return JWT.sign({ _id }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "1d",
  });
};

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    throw new Error("All fields are required");

  const user = await User.findOne({ email });

  if (user) throw new Error("This email already exists");

  const newUser = new User(req.body);

  await newUser.save();

  return res.status(200).json({
    success: true,
    message: "Register is successfully",
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new Error("All fields are required");

  const user = await User.findOne({ email });

  if (!user) throw new Error("This user is not found");

  if (!(await user.isCorrectPassword(password)))
    throw new Error("Password is incorrect");

  const accessToken = generateAccessToken(user._id);

  return res.status(200).json({
    success: true,
    accessToken,
    data: user,
  });
});

const logout = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
});

const socialLogin = asyncHandler(async (req, res, next) => {
  const { facebookId, googleId } = req.body;

  const user = await User.findOne({
    $or: [
      {
        googleId: {
          $exists: true,
          $ne: null,
          $eq: googleId,
        },
        facebookId: {
          $exists: true,
          $ne: null,
          $eq: facebookId,
        },
      },
    ],
  });

  if (!user) {
    next();
  } else {
    req.auth = user;
    next();
  }
});

const socialLoginUpdateInfo = asyncHandler(async (req, res, next) => {
  if (req.auth) {
    next();
  } else {
    const { displayName, email, avatar, googleId, facebookId } = req.body;

    if (googleId) {
      const user = await User.findOneAndUpdate(
        {
          email,
        },
        { $set: { googleId } },
        { new: true }
      );

      if (!user) {
        const newUser = new User({
          displayName,
          email,
          avatar,
          googleId,
          facebookId,
        });

        await newUser.save();
        req.auth = newUser;
        next();
      } else {
        req.auth = user;
        next();
      }
    }

    if (facebookId) {
      const user = await User.findOneAndUpdate(
        {
          email,
        },
        { $set: { facebookId } },
        { new: true }
      );

      if (!user) {
        const newUser = new User({
          displayName,
          email,
          avatar,
          googleId,
          facebookId,
        });

        await newUser.save();
        req.auth = newUser;
        next();
      } else {
        req.auth = user;
        next();
      }
    }
  }
});

const createToken = asyncHandler(async (req, res) => {
  const user = req.auth;

  const accessToken = generateAccessToken(user._id);

  return res.status(200).json({
    success: true,
    accessToken,
    data: user,
  });
});

const forgotPassword = asyncHandler(async (req, res) => {});

const resetPassword = asyncHandler(async (req, res) => {});

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  socialLogin,
  socialLoginUpdateInfo,
  createToken,
};
