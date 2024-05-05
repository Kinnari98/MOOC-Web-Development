// Blogireitit

const express = require("express");
const Blog = require("../db.js");

const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
  console.log("hello from Getblogs");
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  console.log("hello from POSTblogs");

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

console.log("hello from blogsbottom");

module.exports = blogsRouter;
