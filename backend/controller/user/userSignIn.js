const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const useModels = require("../../models/userModel");

async function userSignInController(req, res) {
  try {
    const { account, password } = req.body;

    if (!password) {
      throw new Error("Vui lòng nhập Mật Khẩu");
    }

    const user = await useModels.findOne({ account });

    if (!user) {
      throw new Error("Không tìm thấy tài khoản");
    }

    if (!user.isVerified) {
      throw new Error("Tài khoản chưa được xác minh. Vui lòng xác minh email trước.");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const TokenData = {
        _id: user._id,
        email: user.email,
      }
      const token = jwt.sign(TokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
      const tokenOption = {
        httpOnly: true,
        secure: true
      }
      res.cookie("token", token, tokenOption).status(200).json({
        message: "Đăng nhập thành công",
        data: token,
        success: true,
        error: false
      });
    } else {
      throw new Error("Vui lòng kiểm tra lại mật khẩu");
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
}

module.exports = userSignInController;