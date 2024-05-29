import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./BlogForm.module.css";

const BlogForm = ({ createBlog, toggleVisibility }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
    if (toggleVisibility) {
      toggleVisibility(); // Piilota lomake blogin luomisen jälkeen
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formField}>
          title:
          <input
            type="text"
            value={title}
            placeholder="Enter title"
            className={styles.formInput}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className={styles.formField}>
          author:
          <input
            type="text"
            value={author}
            placeholder="Enter author"
            className={styles.formInput}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className={styles.formField}>
          url:
          <input
            type="text"
            value={url}
            placeholder="Enter URL"
            className={styles.formInput}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" className={styles.formButton}>
          create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func,
};

export default BlogForm;
