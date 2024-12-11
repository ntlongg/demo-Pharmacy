const useModels = require("../../models/userModel");



async function allUsers(req,res){
    try{
        console.log("useId",req.userId)

        const allUsers = await useModels.find()

        res.json({
            message : "All user details",
            data : allUsers,
            success : true,
            error : false
        })
    }catch(err){
        res.json({
            message: err.message || err,
            error: true,
            success: false
          });
    }
}

module.exports = allUsers