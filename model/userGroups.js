const sequelize=require('sequelize');

const db=require('../util/database');

const UserGroups=db.define('userGroups',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    isAdmin:{
        type:sequelize.STRING,
    }
})

module.exports=UserGroups;