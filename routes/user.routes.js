const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

//auth
router.post("/register", authController.signUp);

// user dusplay (block),
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.udapteUser);
router.delete("/:id", userController.deleteUser);
router.patch("friend/:id", userController.friend);
router.patch("unfriend/:id", userController.unfriend);



module.exports = router;