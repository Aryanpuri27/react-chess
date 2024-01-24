const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
  };
  user.password = undefined;

  if (process.env.NODE_ENV === "PRODUCTION") cookieOption.secure = true;
  res.cookie("jwt", token, cookieOption);
  //   res.redirect("/home");
  res.status(200).json({ status: "good", jwt: token });
};

exports.signUp = catchAsync(async (req, res, next) => {
  console.log("signingup");
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(newUser, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  //2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");
  // const correct = await user.correctPassword(password, user.password);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email  or Password", 401));
  }
  //3) if everything ok, send token to clint
  createSendToken(user, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  //1 getting token and checking it exixts
  let token = "";

  if (req.body.jwt) {
    token = req.body.jwt;
  }

  if (!token) {
    return res.status(404).json({ status: "fail" });
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError("User no longer exists", 401));
  }
  req.user = freshUser;
  res.status(200).json({ status: "good", user: freshUser });
});

exports.search = catchAsync(async (req, res) => {
  if (req.body.data) {
    let regex = new RegExp(req.body.data, "i");
    // const userdata = await User.find({ name: `${req.body.data}` });
    const userdata = await User.find({
      $or: [{ name: regex }],
    });
    // console.log("userdata:", userdata);
    res.status(200).json({ data: userdata });
  } else {
    res.status(404);
  }
});
exports.addfriend = catchAsync(async (req, res) => {
  if (req.body.data1) {
    const data = await User.findOne({ _id: req.body.data1 });
    const frienduser = await User.findOne({ _id: req.body.data2 });
    console.log(data);
    await User.findOneAndUpdate(
      { _id: data.id }, // Search criteria
      { $push: { friends: `${frienduser._id}` } }, // Update data
      { new: true } // Options: Return the updated document
    );
    await User.findOneAndUpdate(
      { _id: frienduser.id }, // Search criteria
      { $push: { friends: `${data._id}` } }, // Update data
      { new: true } // Options: Return the updated document
    );
    // console.log("userdata:", userdata);
    res.status(200);
  } else {
    res.status(404);
  }
});

exports.friend = catchAsync(async (req, res) => {
  // console.log("out", req.body.data);
  // if (req.body.data) {
  console.log(req.body.data);
  // const data = await User.findOne({ SocketId: `${socket.id}` });
  const data = await User.findOne({ _id: req.body.data });
  console.log(data);
  // if (data) {
  const data2 = await User.find({
    friends: { $in: [`${data._id}`] },
  });
  // }/
  if (data2) {
    res.status(200).json({
      data: data2,
    });
  }
  res.status(404);
  // console.log(arrr);
  // });
  // } else {
  //   res.status(404);
  // }
});
