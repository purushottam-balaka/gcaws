const express=require('express');

const router=express.Router();

const groupsController=require('../controller/groups')

const authentication=require('../middleware/authenticate')

 router.post('/req_users',authentication.authentication,groupsController.reqUsers);

 router.post('/add_user',authentication.authentication,groupsController.addUser);

 router.get('/groups',authentication.authentication,groupsController.getGroups);

 router.post('/group_msgs',groupsController.groupMsgs);

 router.post('/add_more_users',authentication.authentication,groupsController.addMoreUsers);

 router.post('/grp_members',groupsController.grpMembers);

 router.post('/make_admin',authentication.authentication,groupsController.makeAdmin);

 router.post('/delete_group_user',authentication.authentication,groupsController.deleteGroupUser);

module.exports=router;