import React, { useState } from "react";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    console.log(data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
    }
  };

  return (
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1e1e1e"
    }}
  >
    <div
      style={{
        width: "300px",
        padding: "30px",
        borderRadius: "10px",
        backgroundColor: "#2d2d2d",
        color: "white",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)"
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "10px",
          border: "none",
          borderRadius: "5px"
        }}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "10px",
          border: "none",
          borderRadius: "5px"
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          padding: "10px",
          backgroundColor: "#007acc",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Login
      </button>
    </div>
  </div>
);
}

export default Login;