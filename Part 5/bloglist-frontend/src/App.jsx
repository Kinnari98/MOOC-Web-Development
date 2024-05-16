import React, { useState } from "react";
import Login from "../src/components/Login";
import Blog from "../src/components/Blog";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Logging in with:", username, password);
    setUser({ name: "Kalle Kinnari" }); // Esimerkki käyttäjä
    setUsername("");
    setPassword("");
  };

  console.log("User state:", user);

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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

  const blogs = [
    { id: 1, title: "React patterns", author: "Michael Chan" },
    {
      id: 2,
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
    },
  ];

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
