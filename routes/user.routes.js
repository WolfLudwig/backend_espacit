const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');



//auth
router.post("/", authController.signUp);
router.post("/signin", authController.signIn);
router.get("/logout", authController.logout);
router.get("/isLog", authController.isLog);
router.get("/jwtid/:id", authController.requireAuth);



// user dusplay (block),
//router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.get("/infos/:id", userController.userInfo);
router.get("/", userController.getAllUsers);
router.get("/disctinct/:id", userController.getAllUsersDistinct);
router.get("/myFriends/:id", userController.friendsList);
router.put("/:id", userController.udapteUser);
router.delete("/:id", userController.deleteUser);
router.patch("/friend", userController.Addfriend);
router.patch("/unfriend", userController.unfriend);




module.exports = router;