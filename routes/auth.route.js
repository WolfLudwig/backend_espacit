const router = require('express').Router();
const verify = require('../controllers/verifyToken.controller');

router.post('/', verify.requireAuth);
router.put('/', verify.requireAuth);
router.patch('/', verify.requireAuth);
router.delete('/', verify.requireAuth);

module.exports = router;