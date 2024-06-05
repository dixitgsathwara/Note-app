const express =require("express");
const validateToken =require("../Middleware/validateToken")
const {userLogin,userRegister,getUser} =require("../Controllers/userController")
const router=express.Router();
router.route('/create-account').post(userRegister)
router.route('/login').post(userLogin);
router.route('/get-user').get(validateToken,getUser);
module.exports = router;
