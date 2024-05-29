import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateBlog, deleteBlog, currentUser }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes || 0);

  const blogStyle = {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const detailsStyle = {
    marginTop: 10,
  };

  const buttonStyle = {
    marginLeft: 10,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    if (!blog || !blog.id) {
      console.error("Blog data error:", blog);
      return;
    }

    const currentLikes = typeof blog.likes === "number" ? blog.likes : 0;

    const updatedBlog = {
      ...blog,
      likes: currentLikes + 1,
      user: blog.user ? blog.user.id : undefined,
    };

    try {
      await updateBlog(blog.id, updatedBlog);
      setLikes(currentLikes + 1); // Päivitä tykkäykset tilassa
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the blog "${blog.title}" by ${blog.author}?`
      )
    ) {
      deleteBlog(blog.id);
    }
  };

  return (
    <article style={blogStyle}>
      <div style={headerStyle}>
        <span>
          {blog.title} {blog.author}
        </span>
        <button style={buttonStyle} onClick={toggleVisibility}>
          {visible ? "hide" : "view"}
        </button>
      </div>
      {visible && (
        <div style={detailsStyle}>
          <div>{blog.url}</div>
          <div>
            likes {likes}
            <button style={buttonStyle} onClick={handleLike}>
              like
            </button>
          </div>
          <div>{blog.user ? blog.user.name : "Unknown user"}</div>
          {currentUser && blog.user && currentUser.id === blog.user.id && (
            <button style={buttonStyle} onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      )}
    </article>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.string,
      _id: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
};

export default Blog;
