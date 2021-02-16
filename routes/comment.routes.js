const router = require('express').Router();
const commentController = require('../controllers/comment.controller');

router.get("/", commentController.getAllComments);
router.get("/:id", commentController.getOneComment);
router.get("/all/:id", commentController.getAllCommentsById)
router.patch('/comment-post/', commentController.addComment);
router.put("/:id", commentController.udapteComments);
router.delete("/:id", commentController.deleteComment);
//router.post('/', commentController.addComment);

module.exports = router;