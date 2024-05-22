import React from "react";

const Login = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  const loginFormStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

  const inputStyle = {
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div style={loginFormStyle}>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            style={inputStyle}
            type="text"
            value={username}
            name="Username"
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            style={inputStyle}
            type="password"
            value={password}
            name="Password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button style={buttonStyle} type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
