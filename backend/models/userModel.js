const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
        unique: false,
    },
    account: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    profilePic : String,
    role : String,
},{
    timestamps : true
})


const useModels =  mongoose.model("user",userSchema)


module.exports = useModels