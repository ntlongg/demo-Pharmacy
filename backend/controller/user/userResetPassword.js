
const { sendResetSuccessEmail } = require("../../mailtrap/email");
const bcryptjs = require("bcryptjs");
const useModels = require("../../models/userModel");

async function resetPassword(req, res) {
    try {
        const token = req.params.token;

        const { password } = req.body;

        const user = await useModels.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found or token expired" });
        }

        // Update password
        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        return res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
        console.error("Error in resetPassword ", error);
        return res.status(400).json({ success: false, message: error.message });
    }
}

module.exports = resetPassword;