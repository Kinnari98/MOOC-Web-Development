import React, { useState } from "react";

// Aletaan kiinnittämään nyt vähän huomiota tyylittelyyn:
const Blog = ({ blog }) => {
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
            <button style={buttonStyle}>like</button>
          </div>
          <div>{blog.author ? blog.author : "Author Not Known"}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
