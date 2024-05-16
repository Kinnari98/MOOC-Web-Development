const express = require("express");
const { Blog, User } = require("../db.js");
const { tokenExtractor, userExtractor } = require("../middleware/auth.js");

const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", "username name"); // Populoi käyttäjätiedot
  response.json(blogs);
  console.log("hello from Getblogs");
});

blogsRouter.post(
  "/",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const { title, author, url, likes } = request.body;

    if (!request.user) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(request.user.id);
    if (!user) {
      return response.status(401).json({ error: "user not found" });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id,
    });

    try {
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.status(201).json(savedBlog);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
);

blogsRouter.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const { id } = request.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return response.status(400).json({ error: "Invalid ID format" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    if (blog.user.toString() !== request.user.id) {
      // Varmista, että käyttäjä on blogin omistaja
      return response.status(403).json({ error: "permission denied" });
    }

    try {
      await Blog.findByIdAndDelete(id);
      console.log("Blogi poistettu id:n perusteella onnistuneesti.");
      response.status(204).end();
    } catch (error) {
      console.error("Error deleting blog:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
);

console.log("hello from blogsbottom");

module.exports = blogsRouter;
