const users=require('../model/users');
const messages=require('../model/messages');
const {Op}=require('sequelize')

exports.addMessage=async(req,res,next)=>{
    try{
        const message=req.body.message;
        const gId=req.body.gId;
        //console.log('message',req.body)
        await messages.create({
            message:message,
            name:req.user.name,
            groupId:gId,
        })
        return res.status(201).json();
    }catch(err){
        console.log(err)
    }
    
}

exports.getMessage=async(req,res,next)=>{
    try{
    const lastId=req.body.lastId || 0;
    //console.log('lastid',lastId)
    const msg=await messages.findAll({
        where:{id:{[Op.gt]:lastId}},
        attributes:['id','name','message'],
    }) 
    if(msg==[]){
        return res.status(200)
    }
    else{
        return res.status(201).json({msg:msg});
        }
        
    }catch(err){
        console.log(err)
    }

}
