const Post = require('../models/Post');
const fs = require('fs');
const jwt = require('jsonwebtoken');

//CREATE BLOG POST
const createPost = async (req, res) => {
  try {
    let newPath = null;

    if (req.file) {
      const { originalname, path } = req.file;

      const parts = originalname.split('.');
      const extension = parts[partslength - 1];
      const newPath = path + '.' + extension;
      fs.renameSync(path, newPath); //to add the extension to our image file when storing it in our uploads folder
    }

    const { token } = req.cookies;

    jwt.verify(token, process.env.JWT_SECRET, async (err, info) => {
      if (err) throw err;

      const { title, summary, content } = req.body;

      const post = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.status(200).json(post);
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// GET ALL BLOG POSTS
const getAllPosts = async (req, res) => {
  try {
    const blogPosts = await Post.find()
      .populate('author', ['username']) //we add the second argument which is ['username] so we would not have to include the user password when getting the author data
      .sort({ createdAt: -1 })
      .limit(20); //to limit the number of posts we are fetching to display;
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// GET SINGLE BLOG POST
const getSingleBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const singlePost = await Post.findById(id).populate('author', ['username']); //topopulate the author value we are getting back with the full user details like email and password

    if (!singlePost) {
      return res.status(404).json({ msg: `No post with id : ${id}` });
    }

    res.status(200).json(singlePost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// EDIT BLOG POST
const editPost = async (req, res) => {
  try {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const extension = parts[parts.length - 1];
      newPath = path + '.' + extension;
      fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;

    const { id } = req.params;

    jwt.verify(token, process.env.JWT_SECRET, async (err, info) => {
      if (err) throw err;

      const singlePost = await Post.findById(id);

      const { title, summary, content } = req.body;

      const isAuthor =
        JSON.stringify(singlePost.author) === JSON.stringify(info.id);

      if (!isAuthor) {
        return res
          .status(401)
          .json({ msg: 'You are not authorized to edit this post' });
      }

      await singlePost.updateOne({
        title,
        summary,
        content,
        cover: newPath ? newPath : singlePost.cover,
      });
      res.status(200).json(singlePost);
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// DELETE BLOG POST
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const singlePost = await Post.findByIdAndDelete(id).populate('author', [
      'username',
    ]);

    if (!singlePost) {
      return res.status(404).json({ msg: `No post with id : ${id}` });
    }

    res.status(200).json({ msg: 'Post successfully deleted' });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getSingleBlogPost,
  editPost,
  deletePost,
};
