const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { content, mediaUrl } = req.body;
    const post = await Post.create({ content, mediaUrl, authorId: req.user.id });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: "author" });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};