const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', postController.getPosts);
router.post('/', authMiddleware, upload.single('image'), postController.createPost);
router.put('/:id/like', authMiddleware, postController.likePost);
router.post('/:id/comment', authMiddleware, postController.commentPost);

module.exports = router;
