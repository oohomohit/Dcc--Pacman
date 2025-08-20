import React, { useState, useEffect } from "react";
import { useGame } from "../src/contexts/GameContext";
import { useNavigate, Link } from "react-router-dom";
import { setToken, getToken } from "../src/utils/auth";
import { config } from "../src/config";
import axios from "axios";

function LoginPage() {
  const { setUserName, setEnroll, setPhone } = useGame();
  const [emailOrEnroll, setEmailOrEnroll] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/start");
    }
  }, [navigate]);

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#000033",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    position: "relative",
    overflow: "hidden"
  };

  const gridBackgroundStyle = {
    position: "absolute",
    inset: 0,
    backgroundImage: "linear-gradient(#1a1a4d 1px, transparent 1px), linear-gradient(90deg, #1a1a4d 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    opacity: 0.7
  };

  const cardStyle = {
    position: "relative",
    zIndex: 10,
    width: "100%",
    maxWidth: "28rem",
    backgroundColor: "#1a1a4d",
    padding: "2rem",
    borderRadius: "1rem",
    border: "4px solid #FFD700",
    boxShadow: "0 0 40px rgba(255,215,0,0.4)",
    transition: "transform 0.3s ease",
  };

  const titleStyle = {
    fontSize: "3rem",
    fontFamily: "'Press Start 2P', cursive",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: "1rem",
    animation: "pulse 2s infinite"
  };

  const inputStyle = {
    width: "100%",
    padding: "1rem",
    borderRadius: "0.75rem",
    border: "2px solid #FFD700",
    backgroundColor: "rgba(0,0,51,0.5)",
    color: "#FFD700",
    marginBottom: "1rem",
    outline: "none",
    transition: "all 0.3s ease"
  };

  const labelStyle = {
    display: "block",
    color: "#FFD700",
    marginBottom: "0.5rem",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.875rem"
  };

  const buttonStyle = {
    width: "100%",
    padding: "1rem",
    backgroundColor: "#FFD700",
    color: "#000033",
    borderRadius: "0.75rem",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "1.125rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "2rem",
    boxShadow: "0 0 20px rgba(255,215,0,0.5)",
    border: "2px solid #FFD700"
  };

  const errorStyle = {
    padding: "1rem",
    backgroundColor: "rgba(139,0,0,0.5)",
    color: "#FFB6C1",
    border: "2px solid #DC143C",
    borderRadius: "0.75rem",
    marginBottom: "1rem",
    textAlign: "center",
    animation: "pulse 2s infinite"
  };

  const linkContainerStyle = {
    marginTop: "2rem",
    textAlign: "center",
    color: "#FFD700",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.875rem"
  };

  const linkStyle = {
    color: "#00FF00",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.3s ease"
  };

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!emailOrEnroll || !password) {
      setError("All fields are required, player!");
      return;
    }
    const isEmail = emailOrEnroll.includes("@");
    const loginPayload = isEmail
      ? { email: emailOrEnroll.toLowerCase(), password }
      : { enroll: emailOrEnroll, password };

    axios.post(config.endpoints.login, loginPayload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: false,
    })
    .then((res) => {
      setToken(res.data.data.accessToken);
      setUserName(res.data.data.user.userName);
      setEnroll(res.data.data.user.enroll);
      setPhone(res.data.data.user.phone);
      navigate("/start");
    })
    .catch((err) => {
      setError(err?.response?.data?.message || "Login failed! Check your entry, cadet.");
    });
  }

  return (
    <div style={containerStyle}>
      <div style={gridBackgroundStyle}></div>
      
      <div style={cardStyle}>
        <h1 style={titleStyle}>PACMAN</h1>
        
        {error && (
          <div style={errorStyle}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label style={labelStyle}>
              Email / Enrollment ID:
            </label>
            <input
              type="text"
              value={emailOrEnroll}
              onChange={(e) => setEmailOrEnroll(e.target.value)}
              placeholder="ENTER YOUR ID"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ENTER PASSWORD"
              required
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 0 30px rgba(255,215,0,0.7)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 0 20px rgba(255,215,0,0.5)";
            }}
          >
            START GAME
          </button>
        </form>

        <div style={linkContainerStyle}>
          New Player?{" "}
          <Link 
            to="/register" 
            style={linkStyle}
            onMouseOver={(e) => e.target.style.color = "rgba(0,255,0,0.8)"}
            onMouseOut={(e) => e.target.style.color = "#00FF00"}
          >
            REGISTER
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
