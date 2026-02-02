const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let image = '';
    
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    if (!text && !image) {
      return res.status(400).json({ message: 'Text or image is required' });
    }
    
    const post = new Post({
      userId: req.userData.userId,
      username: req.userData.username,
      text,
      image,
      likes: [],
      comments: []
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const username = req.userData.username;
    const index = post.likes.indexOf(username);
    if (index === -1) {
      post.likes.push(username);
    } else {
      post.likes.splice(index, 1);
    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error: error.message });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.comments.push({
      username: req.userData.username,
      text,
      createdAt: new Date()
    });
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error commenting on post', error: error.message });
  }
};
