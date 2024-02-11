const sequelize=require('sequelize');

const db=require('../util/database');

const groups=db.define('groups',{
    id:{
        type:sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    group_name:{
        type:sequelize.STRING,
        allowNull:false,
        unique:true,
    },
});

module.exports=groups;