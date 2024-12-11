const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE } = require("../mailtrap/emailTemplates");
const { sender, mailtrapClient } = require("../mailtrap/mailtrapConfig");

const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const response = await mailtrapClient.sendMail({
            from: sender,
            to: email, // Chỉ định email người nhận trực tiếp, không cần đặt trong mảng
            subject: "Xác minh email của bạn",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Xác minh Email",
        });

        console.log("Email đã được gửi thành công", response);
    } catch (error) {
        console.error(`Lỗi khi gửi email xác minh`, error);
        throw new Error(`Lỗi khi gửi email xác minh: ${error}`);
    }
};

const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const response = await mailtrapClient.sendMail({
            from: sender,
            to: email, // Chỉ định email người nhận trực tiếp, không cần đặt trong mảng
            subject: "Đặt lại mật khẩu của bạn",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Đặt lại Mật khẩu",
        });
    } catch (error) {
        console.error(`Lỗi khi gửi email đặt lại mật khẩu`, error);
        throw new Error(`Lỗi khi gửi email đặt lại mật khẩu: ${error}`);
    }
};

const sendResetSuccessEmail = async (email) => {
    try {
        const response = await mailtrapClient.sendMail({
            from: sender,
            to: email, // Chỉ định email người nhận trực tiếp, không cần đặt trong mảng
            subject: "Đặt lại mật khẩu thành công",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Đặt lại Mật khẩu",
        });

        console.log("Email đặt lại mật khẩu đã được gửi thành công", response);
    } catch (error) {
        console.error(`Lỗi khi gửi email đặt lại mật khẩu thành công`, error);
        throw new Error(`Lỗi khi gửi email đặt lại mật khẩu thành công: ${error}`);
    }
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail, sendResetSuccessEmail };