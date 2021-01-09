const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');


//auth
router.post("/register", authCtrl.signUp);
router.post("/login", authCtrl.signIn);
router.get("/logout", authCtrl.logout);

// user dusplay (block),
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.userInfo);
router.put("/:id", userCtrl.udapteUser);
router.delete("/:id", userCtrl.deleteUser);
router.patch("friend/:id", userCtrl.friend);
router.patch("unfriend/:id", userCtrl.unfriend);




module.exports = router;