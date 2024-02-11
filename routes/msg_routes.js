const express=require('express');

const router=express.Router();

const singupAndLogin=require('../controller/signupAndLogin');

const messages=require('../controller/messages');

const authenticate=require('../middleware/authenticate');

router.get('/',singupAndLogin.home);

router.post('/signup',singupAndLogin.signup);

router.post('/login',singupAndLogin.login);

router.post('/add_message',authenticate.authentication,messages.addMessage);

router.get('/get_message',messages.getMessage);

module.exports=router;