const { message } = require("antd");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");
const { use } = require("react");
const createUser = async (newUser) => {
  const { name, email, password, confirmPassword, phone } = newUser;
  try {
    const checkUser = await User.findOne({
      email: email,
    });
    if (checkUser !== null) {
      return { status: "ERR", message: "Email is already" };
    }
    const hash = bcrypt.hashSync(password, 10);
    console.log("hash", hash);
    const createNewUser = await User.create({
      name: name,
      email: email,
      password: hash,
      phone: "0",
    });
    return {
      status: "OK",
      message: "User CREATED successfully",
      data: createNewUser,
    };
  } catch (e) {
    throw e;
  }
};
const loginUser = async (userLogin) => {
  const { password, email } = userLogin;
  try {
    const checkUser = await User.findOne({
      email: email,
    });
    if (checkUser === null) {
      return { status: "ERR", message: "The user is not defined" };
    }
    const comparePassword = bcrypt.compareSync(password, checkUser.password);
    if (!comparePassword) {
      return { status: "ERR", message: "User or Password is wrong " };
    }
    access_token = await generalAccessToken({
      id: checkUser.id,
      isAdmin: checkUser.isAdmin,
    });
    refresh_token = await generalRefreshToken({
      id: checkUser.id,
      isAdmin: checkUser.isAdmin,
    });
    return {
      status: "OK",
      message: "LOGIN successfully",
      access_token,
      refresh_token,
    };
    // if(checkUser )
  } catch (e) {
    throw e;
  }
};
const updateUser = async (id, data) => {
  try {
    const checkUser = await User.findById(id);
    if (!checkUser) {
      return {
        status: "ERR",
        message: "User is required",
      };
    }
    const userUpdate = await User.findByIdAndUpdate(id, data, { new: true });
    return {
      status: "OK",
      message: "User UPDATED successfully",
      data: userUpdate,
    };
  } catch (e) {
    throw e;
  }
};
const deleteUser = async (id) => {
  try {
    const checkUser = await User.findById(id);
    console.log("checkUser", checkUser);
    if (checkUser === null) {
      return {
        status: 400,
        message: "User is required",
      };
    }
    await User.findByIdAndDelete(id);
    return { status: "OK", message: "User DELETED successfully" };
  } catch (e) {
    throw e;
  }
};
const getAllUser = async () => {
  try {
    const allUser = await User.find();
    return {
      status: "OK",
      message: "Get all success",
      data: allUser,
    };
  } catch (e) {
    throw e;
  }
};
const getDetailUser = async (id) => {
  try {
    const checkUser = await User.findById(id);
    if (!checkUser === null) {
      return {
        status: "ERR",
        message: "User not found",
      };
    }
    return {
      status: "OK",
      message: "Get detail user success",
      data: checkUser,
    };
  } catch (e) {
    throw e;
  }
};
const deleteMany = async(res.body){
try {
  re
} catch (e) {
  throw(e)
}
}
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
};
