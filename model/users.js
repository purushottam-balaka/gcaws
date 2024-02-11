const Sequelize=require('sequelize');

const db=require('../util/database');

const users=db.define('users',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    phone_number:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },

});

module.exports=users;