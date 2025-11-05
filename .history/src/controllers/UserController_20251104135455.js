const { message } = require("antd");
const userService = require("../services/UserService");
const jwtService = require("../services/JwtService");
const { default: mongoose } = require("mongoose");
const { refreshTokenJwtService } = require("../services/JwtService");
const createUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isCheckEmail = emailRegex.test(email);
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "ERR",
        message: "Email is invalid",
      });
    } else if (confirmPassword !== password) {
      return res.status(400).json({
        status: "ERR",
        message: "confirmPassword not equal password",
      });
    }
    const result = await userService.createUser(req.body);
    return res.status(200).json({
      status: "OK",
      message: "Create User Successs",
      data: result,
    });
  } catch (e) {
    console.error(e);
    return res.status(404).json({
      message: e.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const result = await userService.loginUser(req.body);

    const { refresh_token, ...newResult } = result;
    console.log("result", newResult);
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      status: "OK",
      message: "Login Success",
      data: newResult,
    });
  } catch (e) {
    console.error(e);
    return res.status(404).json({
      message: e.message,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    const response = await userService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    console.error(e);
    return res.status(404).json({
      message: e.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await userService.deleteUser(userId);
    return res.status(200).json({ response });
  } catch (e) {
    console.error(e);
    return res.status(404).json({
      message: e.message,
    });
  }
};
const getAllUser = async (req, res) => {
  try {
    const response = await userService.getAllUser();
    return res.status(200).json({ response });
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e.message,
    });
  }
};
const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await userService.getDetailUser(userId);
    return res.status(200).json({ response });
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e.message,
    });
  }
};
const refreshToken = async (req, res) => {
  console.log("req.cookies:", req.cookies.refresh_token);
  try {
    const token = req.cookies.refresh_token;
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "Token is not exist",
      });
    }
    const response = await jwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e.message,
    });
  }
};
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      status: "OK",
      message: "Logout successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e.message,
    });
  }
};
const deleteMany = async (req, res) => {
  try {
    const ids = req.params.id;
    const response = await userService.deleteUser(userId);
    return res.status(200).json({ response });
  } catch (e) {
    console.error(e);
    return res.status(404).json({
      message: e.message,
    });
  }
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  refreshToken,
  logoutUser,
  deleteMany,
};
