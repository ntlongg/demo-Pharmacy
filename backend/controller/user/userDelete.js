const useModels = require("../../models/userModel")


async function deleteUser(req, res) {
    try {
        const sessionUser = req.userId
        const { userId , email, name, role} = req.body
        const payload  ={
            ...( email && { email : email}),
            ...( name && { name : name}),
            ...( role && { role : role}),
        }
        const user = await useModels.findById(sessionUser)
        console.log("userId",user.userId)
        const deletedUser = await useModels.findByIdAndDelete(userId,payload);

        res.json({
            data : deletedUser,
            message : "Xoá người dùng thành công",
            success : true,
            error : false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}


module.exports = deleteUser;
