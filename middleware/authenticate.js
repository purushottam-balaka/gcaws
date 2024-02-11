const jwt=require("jsonwebtoken");
const users=require('../model/users')

exports.authentication=async(req,res,next)=>{
    try{
        const token=req.header('Authorization');
        const id=jwt.verify(token,process.env.KEY)
        const user= await users.findByPk(id.uId)
        req.user=user;
        next();
    }catch(err){
        console.log(err);
    }
}