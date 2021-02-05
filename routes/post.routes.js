const router = require('express').Router();
const postController = require('../controllers/post.controller');
const verify = require('../controllers/verifyToken.controller');

router.get('/', postController.readPost);
router.get('/:id', postController.getOnePost);
router.get('/liked-post/:id', postController.getRessourcesByLikes);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);


//commentaire
router.get('/comments/:id', postController.getAllCommentsById);
// router.patch('/comment-post', verify.requireAuth);
router.patch('/comment-post', postController.commentPost);
router.patch('/answer-post', postController.answerPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);




module.exports = router;