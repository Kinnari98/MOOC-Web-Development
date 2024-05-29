import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Login from "../src/components/Login";
import Blog from "../src/components/Blog";
import BlogForm from "../src/components/BlogForm";
import Notification from "../src/components/Notifications";
import Togglable from "../src/components/Toggle";
import styles from "../src/components/styles.module.css"; // Importtaa tyylit

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3003/api/blogs");
        const sortedBlogs = response.data.sort((a, b) => b.likes - a.likes); // Sorttaus
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3003/api/login", {
        username,
        password,
      });

      const userData = response.data;
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(userData)
      );
      setUser(userData);
      setUsername("");
      setPassword("");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
      setNotification({ message: "Successfully logged in", type: "success" });
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);
    } catch (error) {
      setNotification({ message: "wrong username/password", type: "error" });
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);
      console.error("Invalid credentials");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    axios.defaults.headers.common["Authorization"] = null;
    setNotification({ message: "Successfully logged out", type: "success" });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 5000);
  };

  const createBlog = async (newBlog) => {
    try {
      const response = await axios.post(
        "http://localhost:3003/api/blogs",
        newBlog
      );
      const newBlogs = [...blogs, response.data].sort(
        (a, b) => b.likes - a.likes
      ); // Lisää uusi blogi ja järjstelee uusiks
      setBlogs(newBlogs);
      setNotification({
        message: `A new blog '${response.data.title}' by ${response.data.author} added`,
        type: "success",
      });
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      setNotification({ message: "Error creating blog", type: "error" });
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);
      console.error("Error creating blog:", error);
    }
  };

  const updateBlog = async (id, blogToUpdate) => {
    try {
      const response = await axios.put(
        `http://localhost:3003/api/blogs/${id}`,
        blogToUpdate
      );
      const updatedBlogs = blogs
        .map((blog) => (blog.id === id ? { ...blog, ...response.data } : blog))
        .sort((a, b) => b.likes - a.likes);
      setBlogs(updatedBlogs);
      setNotification({
        message: "Blog updated successfully",
        type: "success",
      });
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);
    } catch (error) {
      console.error("Failed to update blog:", error);
      setNotification({ message: "Failed to update blog", type: "error" });
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={notification.message} type={notification.type} />
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBlogs(blogs.filter((blog) => blog.id !== id));
      setNotification({
        message: "Blog deleted successfully",
        type: "success",
      });
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);
    } catch (error) {
      console.error("Failed to delete blog:", error);
      setNotification({ message: "Failed to delete blog", type: "error" });
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <h2 className={styles.centered}>Blogs</h2>
        {user && (
          <div className={styles.userInfo}>
            <span>{user.name} logged in</span>
            <button className={styles.button} onClick={handleLogout}>
              logout
            </button>
          </div>
        )}
      </header>
      <Notification message={notification.message} type={notification.type} />
      {user && (
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
      )}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          currentUser={user}
        />
      ))}
    </div>
  );
};

export default App;
