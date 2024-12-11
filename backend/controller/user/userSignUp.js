
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../../untils/generateTokenAndSetCookie");
const { sendVerificationEmail } = require("../../mailtrap/email");
const useModels = require("../../models/userModel");

async function userSignUpController(req, res) {
  const { email, password, name, account } = req.body;

  try {
    const userAlreadyExists = await useModels.findOne({ account });
    console.log("userAlreadyExists", userAlreadyExists);

    if (userAlreadyExists) {
      throw new Error("Người dùng đã tồn tại");
    }

    if (!email) {
      throw new Error("Vui lòng nhập Email");
    }
    if (!password) {
      throw new Error("Vui lòng nhập Mật Khẩu");
    }
    if (!name) {
      throw new Error("Vui lòng nhập Tên");
    }
    if (!account) {
      throw new Error("Vui lòng nhập Tên");
    }

    const salt = bcrypt.genSaltSync(10); //sử dụng salt để tăng cường bảo mật
    const hashPassword = bcrypt.hashSync(password, salt);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    if (!hashPassword) {
      throw new Error("Something is wrong");
    }

    const user = new useModels({
      ...req.body,
      password: hashPassword,
      role: "CUSTOMER",
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 5 * 60 * 1000 // 5 phút
    });

    await user.save();
    

    // jwt
    generateTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);

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

module.exports = userSignUpController;
