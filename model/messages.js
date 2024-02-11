const sequelize=require('sequelize');

const db=require('../util/database');

const messages=db.define('messages',{
    id:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:sequelize.STRING,
        allowNull:false,
    },
    message:{
        type:sequelize.STRING,
        allowNull:false,
    }

})

module.exports=messages;