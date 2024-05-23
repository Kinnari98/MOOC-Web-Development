import React, { useState } from "react";
import styles from "./BlogForm.module.css"; // Importtaa tyylitiedosto
import PropTypes from "prop-types";

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
    toggleVisibility(); // Piilota lomake blogin luomisen jälkeen
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
            className={styles.formInput}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className={styles.formField}>
          author:
          <input
            type="text"
            value={author}
            className={styles.formInput}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className={styles.formField}>
          url:
          <input
            type="text"
            value={url}
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

// Proppikorjaukset
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
};

export default BlogForm;
