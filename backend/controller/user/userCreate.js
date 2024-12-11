
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../../untils/generateTokenAndSetCookie");
const userModel = require("../../models/userModel");



async function userCreateController(req, res) {
  const { password, name, account } = req.body;

  try {
    const userAlreadyExists = await userModel.findOne({ account });
    console.log("Người dùng đã tồn tại", userAlreadyExists);

    if (userAlreadyExists) {
      throw new Error("Người dùng đã tồn tại");
    }

    if (!password) {
      throw new Error("Vui lòng nhập Mật Khẩu");
    }
    if (!name) {
      throw new Error("Vui lòng nhập Tên");
    }
    if (!account) {
      throw new Error("Vui lòng nhập Tài khoản");
    }

    const salt = bcrypt.genSaltSync(10); //sử dụng salt để tăng cường bảo mật
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong");
    }

    const user = new userModel({
      ...req.body,
      password: hashPassword,
      role: "PERSONNEL",
      isVerified : true
    });

    await user.save();
    

    // jwt
    generateTokenAndSetCookie(res, user._id);

    res.status(201).json({
      user: {
        ...user._doc,
        password: undefined,
      },
      success: true,
      error: false,
      message: "Tài khoản đã được tạo",
    });
  } catch (err) {
    console.log("err", err.message);
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userCreateController;
