const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');



//auth
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.get("/logout", authController.logout);
router.get("/isLog", authController.isLog);

// user dusplay (block),

router.get("/infos/:_id", userController.getOneUser);
router.get("/", userController.getAllUsers);
router.get("/disctinct/:id", userController.getAllUsersDistinct);
router.get("/myFriends/", userController.friendsList);
router.put("/:id", userController.udapteUser);
router.delete("/:id", userController.deleteUser);
router.patch("/friend", userController.Addfriend);
router.patch("/unfriend", userController.unfriend);
//router.get("/", userController.getAllUsers);
//router.get("/infos/:id", verify.requireAuth);
router.get("/infos", userController.currentUserInfo);




module.exports = router;