import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getToken } from "../src/utils/auth";
import axios from "axios";
import { API_URL } from '../src/config';

function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enroll, setEnroll] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    maxWidth: "32rem",
    backgroundColor: "#1a1a4d",
    padding: "2rem",
    borderRadius: "1rem",
    border: "4px solid #FFD700",
    boxShadow: "0 0 40px rgba(255,215,0,0.4)",
    transition: "transform 0.3s ease"
  };

  const titleStyle = {
    fontSize: "3rem",
    fontFamily:  "Press Start 2P",
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
    fontFamily:  "Press Start 2P",
    fontSize: "0.875rem"
  };

  const buttonStyle = {
    width: "100%",
    padding: "1rem",
    backgroundColor: "#FFD700",
    color: "#000033",
    borderRadius: "0.75rem",
    fontFamily:  "Press Start 2P",
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

  const successStyle = {
    padding: "1rem",
    backgroundColor: "rgba(0,100,0,0.5)",
    color: "#98FB98",
    border: "2px solid #00FF00",
    borderRadius: "0.75rem",
    marginBottom: "1rem",
    textAlign: "center",
    animation: "pulse 2s infinite"
  };

  const linkContainerStyle = {
    marginTop: "2rem",
    textAlign: "center",
    color: "#FFD700",
    fontFamily:  "Press Start 2P",
    fontSize: "0.875rem"
  };

  const linkStyle = {
    color: "#00FF00",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.3s ease"
  };

  const formGroupStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginBottom: "1rem"
  };

  const passwordHintStyle = {
    color: "#FFD700",
    fontSize: "0.75rem",
    marginTop: "0.5rem",
    opacity: 0.8
  };

  function validatePassword(pw) {
    // At least 8 chars, one uppercase, one lowercase, one number, one special char
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(pw);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!userName || !email || !password || !enroll || !phone) {
      setError("Need all your deets, rookie!");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password needs: 8+ chars, Aa, 123, #?!"); // Shorter hint
      return;
    }
    axios.post(`${API_URL}/register`, {
      userName, email, password, enroll, phone
    }, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      setSuccess("Account Created! Get Ready To Play!");
      setTimeout(() => navigate("/"), 3000); // Longer for reading success
    })
    .catch(err => {
      setError(err?.response?.data?.message || "Registration Error! Try again.");
    });
  }

  return (
    <div style={containerStyle}>
      <div style={gridBackgroundStyle}></div>

      <div style={cardStyle}>
        <h1 style={titleStyle}>PACMAN</h1>
        
        <p style={{
          textAlign: "center",
          marginBottom: "1rem",
          color: "#FFD700",
          fontFamily:  "Press Start 2P",
          fontSize: "1rem"
        }}>
          Get your name on the high score board!
        </p>

        {error && (
          <div style={errorStyle}>
            {error}
          </div>
        )}
        
        {success && (
          <div style={successStyle}>
            {success}
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
            <div style={formGroupStyle}>
              <div>
                <label style={labelStyle}>
                  Player Name:
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  placeholder="ENTER YOUR TAG"
                  required
                  style={inputStyle}
                />
              </div>
              
              <div>
                <label style={labelStyle}>
                  Email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="YOUR@EMAIL.COM"
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="CHOOSE SECRET CODE"
                required
                style={inputStyle}
              />
              <p style={passwordHintStyle}>
                (Min 8 chars, Upper, Lower, Num, Symbol)
              </p>
            </div>

            <div style={formGroupStyle}>
              <div>
                <label style={labelStyle}>
                  Enrollment ID:
                </label>
                <input
                  type="text"
                  value={enroll}
                  onChange={e => setEnroll(e.target.value)}
                  placeholder="YOUR ID"
                  required
                  style={inputStyle}
                />
              </div>
              
              <div>
                <label style={labelStyle}>
                  Phone:
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="YOUR PHONE"
                  required
                  style={inputStyle}
                />
              </div>
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
              JOIN THE ARCADE
            </button>
          </form>
        )}

        <div style={linkContainerStyle}>
          Already a Player?{" "}
          <Link 
            to="/" 
            style={linkStyle}
            onMouseOver={(e) => e.target.style.color = "rgba(0,255,0,0.8)"}
            onMouseOut={(e) => e.target.style.color = "#00FF00"}
          >
            LOGIN HERE
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage; 