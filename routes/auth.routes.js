const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');

router.post("/register"), authCtrl.signup;
router.post("/login"), authCtrl.login;

module.exports = router;