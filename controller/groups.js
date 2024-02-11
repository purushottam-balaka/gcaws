const users=require('../model/users')
const groups=require('../model/groups')
const messages=require('../model/messages')
const op=require('sequelize').Op
const sequelize=require('sequelize');
const userGroups=require('../model/userGroups');

exports.reqUsers=async(req,res,next)=>{
    try{
        const grpName=req.body.name;
        // console.log('grp',req.body)
        await groups.create({
            group_name:grpName,
        })

        const gId=await groups.findOne({where:{group_name:grpName}})
        await userGroups.create({
            isAdmin:true,
            userId:req.user.id,
            groupId:gId.id,
        })
        const uId=req.user.id;
        const urs=await users.findAll({where:{id:{[op.ne]:uId}}});
        return res.status(200).json({urs:urs,gId:gId});
    }catch(err){
        console.log(err)
    }
  
}

exports.addUser=async(req,res,next)=>{
    try{
        //console.log('add',req.body)
        const gId=req.body.gId.id;
        const id=req.body.id;
        // await groups.create({
        //     group_name:grpName,
        //     userId:id,
        // })
        await userGroups.create({
            userId:id,
            groupId:gId,
        })
        return res.status(200).json();
    }catch(err){
        console.log(err)
    }
}

exports.getGroups=async(req,res,next)=>{
    try{
        const grp= await userGroups.findAll({
            where:{userId:req.user.id},
            include:[{
                model:groups,
                attributes:['id','group_name'],
                // on:{
                //  col1: sequelize.where(sequelize.col(groups.id), "=", sequelize.col(userGroups.groupId)),
                // }
                
            }]
        })

            return res.status(200).json({groups:grp})
    }catch(err){
        console.log(err)
    }
}

exports.groupMsgs=async(req,res,next)=>{
    try{
        console.log('group msgs',req.body)
        const gId=req.body.gId;
        const grpMsgs=await messages.findAll({where:{groupId:gId}})
            return res.status(200).json({grpMsgs:grpMsgs});
    }catch(err){
        console.log(err)
    }
}

exports.addMoreUsers=async(req,res,next)=>{
    try{
        const uname=req.body.uname;
        const gId=req.body.gId;
        // console.log('moreUsers',req.body)
        const ad=await userGroups.findOne({
            where:{
                userId:req.user.id,
                groupId:gId
            }
        })
        console.log('ad',ad.isAdmin)
        if(ad.isAdmin==1){
        const usr=await users.findOne({where:{name:uname}})
        if(usr){
            await userGroups.create({
                userId:usr.id,
                groupId:gId,
            })
        }
        return res.status(200).json();
        }
        else{
            return res.status(201).json()
        }
    }catch(err){
        console.log(err)
    }
}

exports.grpMembers=async(req,res,next)=>{
    try{
        const gid=req.body.id;
        const urs=await userGroups.findAll({
            where:{groupId:gid},
            attributes:['isAdmin','groupId'],
            include:[{
            model:users,
            attributes:['name','id'],
            }]
        });
        return res.status(200).json({users:urs})
    }catch(err){
        console.log(err)
    }
}

exports.makeAdmin=async(req,res,next)=>{
    try{
        console.log('admin',req.body)
        const {uId,gId}=req.body;
        const ad=await userGroups.findOne({
            where:{
                userId:req.user.id,
                groupId:gId
            }
        })
        if(ad.isAdmin==1){
        await userGroups.update(
            {isAdmin:true},
            {where:{userId:uId,groupId:gId}}
        )
        .then(()=>{
            return res.status(200).json();
        })
            }
            else{
                return res.status(201).json();
            }
    }catch(err){
        console.log(err)
    }
}

exports.deleteGroupUser=async(req,res,next)=>{
    try{
        const uname=req.body.uname;
        const gId=req.body.gId;
        //console.log('moreUsers',req.body)
        
        const ad=await userGroups.findOne({
            where:{
                userId:req.user.id,
                groupId:gId
            }
        })
        if(ad.isAdmin==1){
        
        const usr=await users.findOne({where:{name:uname}})
        if(usr){
            await userGroups.destroy({
                where:{
                userId:usr.id,
                groupId:gId,
                }
            })
            return res.status(200).json();
            }
        }
        else{
            return res.status(201).json();
        }
        
    }catch(err){
        console.log(err);
    }
}