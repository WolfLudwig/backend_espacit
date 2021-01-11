const router = require('express').Router();
//const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');

/*
//auth
router.post("/register", authCtrl.signup);
router.post("/login", authCtrl.login);
//router.get("/logout", authCtrl.logout);
*/

// user display (block),
router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.userInfo);
router.put("/:id", auth, userCtrl.udapteUser);
router.delete("/:id", auth, userCtrl.deleteUser);
router.patch("friend/:id", auth, userCtrl.friend);
router.patch("unfriend/:id", auth, userCtrl.unfriend);




module.exports = router;