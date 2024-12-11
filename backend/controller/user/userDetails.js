const useModels = require("../../models/userModel")



async function userDetailsController(req,res){
    try{
        const user = await useModels.findById(req.userId).select("-password")
        res.status(200).json({
            data : user,
            error : false,
            success : true,
            message : "Chi tiết người dùng "
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = userDetailsController