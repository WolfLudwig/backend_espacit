const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

console.log("Je suis dans userRoutes 4");


//auth
router.post("/", authController.signUp);
router.post("/:signIn", authController.signIn);
router.get("/logout", authController.logout);

// user dusplay (block),
//router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.get("/", userController.getAllUsers);
router.put("/:id", userController.udapteUser);
router.delete("/:id", userController.deleteUser);
router.patch("friend/:id", userController.friend);
router.patch("unfriend/:id", userController.unfriend);




module.exports = router;