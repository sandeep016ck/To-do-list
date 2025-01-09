const express=require("express");
const {createUser,userLogin, getUser}=require("../controllers/userController")
const router=express.Router();

router.post('/register',createUser);

router.post('/login',userLogin);

router.get('/meta',getUser)

module.exports=router;
