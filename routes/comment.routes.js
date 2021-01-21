const router = require('express').Router();
const commentController = require('../controllers/comment.controller');

router.get("/", commentController.getAllComments);
router.get("/:id", commentController.getOneComment);
router.put("/:id", commentController.udapteComments);
router.delete("/:id", commentController.deleteComment);
//router.post('/', commentController.addComment);

module.exports = router;