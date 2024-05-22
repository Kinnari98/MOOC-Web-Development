import React, { useState } from "react";

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false);

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

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user._id : undefined,
    };
    updateBlog(blog.id, updatedBlog);
  };

  return (
    <div style={blogStyle}>
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
            likes {blog.likes}
            <button style={buttonStyle} onClick={handleLike}>
              like
            </button>
          </div>
          <div>{blog.author ? blog.author : "Author Not Known"}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
