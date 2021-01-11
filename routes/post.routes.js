const router = require('express').Router();
const postCtrl = require('../controllers/post.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', postCtrl.readPost);
router.post('/', auth, postCtrl.createPost);
router.put('/:id', auth, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);
router.patch('/like-post/:id', auth, postCtrl.likePost);
router.patch('/unlike-post/:id', auth, postCtrl.unlikePost);


//commentaire
router.patch('/comment-post/:id', auth, postCtrl.commentPost);
router.patch('/edit-comment-post/:id', auth, postCtrl.editCommentPost);
router.patch('/delete-comment-post/:id', auth, postCtrl.deleteCommentPost);


module.exports = router;