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

blogsRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return response.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      console.log("Blogia ei löydetty.");
      return response.status(404).json({ error: "Blog not found" });
    }
    console.log("Blogi poistettu id:n perusteella onnistuneesti.");
    response.status(204).end();
  } catch (error) {
    console.error("Error deleting blog:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

console.log("hello from blogsbottom");

module.exports = blogsRouter;
