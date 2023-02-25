const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const authService = require("../services/authService");
const jwt = require("jsonwebtoken");
exports.postLogin = async (req, res, next) => {
  const { mssv, password } = req.body;
  if (!mssv || !password) {
    next(new AppError("Please provide mssv and password!", 400));
  }
  user = await userModel.getUsersByMSSV(mssv);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid mssv or password" });
  } else {
    const accessToken = authService.generateToken(user);
    const cookieOption = {
      expires: new Date(Date.now() + 900000),
      path: "/",
      httpOnly: true,
    };
    res.cookie("access-token", accessToken, cookieOption);
    res.status(200).json({
      status: "Login successfully",
      user: {
        role: user.role,
        mssv: user.mssv,
      },
    });
  }
};

exports.logout = (req, res, next) => {
  res.clearCookie("access-token");
};
