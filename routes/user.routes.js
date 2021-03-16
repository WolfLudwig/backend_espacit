const router = require('express').Router();
const userController = require('../controllers/user.controller');


// user dusplay (block),

router.get("/likes/:id", userController.checkLikes);
router.get("/infos/:_id", userController.getOneUser);
router.get("/:id", userController.getAllUsers);
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