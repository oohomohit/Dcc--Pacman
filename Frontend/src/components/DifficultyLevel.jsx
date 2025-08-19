import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";

export function DifficultyLevel() {
  const [selectedLevel, setSelectedLevel] = useState('Easy Mode');
  const [isStarting, setIsStarting] = useState(false);
  const navigate = useNavigate();
  const { setDifficulty, setMazeSize, MazeInput, setCurrentMaze, setStatus } = useGame();

  const selectStyle = {
    width: "100%",
    padding: "1rem",
    paddingRight: "3rem",
    marginBottom: "1.5rem",
    backgroundColor: "rgba(0, 0, 51, 0.5)",
    color: "#FFD700",
    border: "2px solid #FFD700",
    borderRadius: "0.75rem",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.875rem",
    cursor: "pointer",
    outline: "none",
    transition: "all 0.3s ease",
    appearance: "none"
  };

  const labelStyle = {
    display: "block",
    color: "#FFD700",
    marginBottom: "0.5rem",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "1rem"
  };

  const buttonStyle = {
    width: "100%",
    padding: "1rem",
    backgroundColor: "#FFD700",
    color: "#000033",
    borderRadius: "0.75rem",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 0 20px rgba(255,215,0,0.3)",
    border: "2px solid #FFD700"
  };

  const arrowContainerStyle = {
    position: "absolute",
    right: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    width: "20px",
    height: "20px"
  };

  // Effect to handle game start after state updates
  useEffect(() => {
    if (isStarting) {
      const mazeData = MazeInput();
      setCurrentMaze(mazeData);
      setStatus("active");
      navigate("/mazepage");
      setIsStarting(false);
    }
  }, [isStarting, MazeInput, setCurrentMaze, setStatus, navigate]);

  const handleStart = async () => {
    let mazeSize;
    switch(selectedLevel) {
      case 'Easy Mode':
        mazeSize = 5;
        break;
      case 'Medium Mode':
        mazeSize = 7;
        break;
      case 'Hard Mode':
        mazeSize = 9;
        break;
      default:
        mazeSize = 5;
    }
    
    // Set all the context states first
    setDifficulty(selectedLevel);
    setMazeSize(mazeSize);
    
    // Use a small delay to ensure state updates are processed
    setTimeout(() => {
      setIsStarting(true);
    }, 0);
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "2rem" }}>
        <label style={labelStyle}>
          Select Level:
        </label>
        <div style={{ position: "relative" }}>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            style={selectStyle}
            onMouseOver={(e) => {
              e.target.style.boxShadow = "0 0 20px rgba(255,215,0,0.5)";
              e.target.style.transform = "scale(1.02)";
            }}
            onMouseOut={(e) => {
              e.target.style.boxShadow = "none";
              e.target.style.transform = "scale(1)";
            }}
          >
            <option value="Easy Mode" style={{
              backgroundColor: "#000033",
              color: "#FFD700",
              fontFamily: "'Press Start 2P', cursive",
              padding: "0.5rem"
            }}>Easy Mode</option>
            <option value="Medium Mode" style={{
              backgroundColor: "#000033",
              color: "#FFD700",
              fontFamily: "'Press Start 2P', cursive",
              padding: "0.5rem"
            }}>Medium Mode</option>
            <option value="Hard Mode" style={{
              backgroundColor: "#000033",
              color: "#FFD700",
              fontFamily: "'Press Start 2P', cursive",
              padding: "0.5rem"
            }}>Hard Mode</option>
          </select>
          <div style={arrowContainerStyle}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 8L10 13L15 8" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <button
        onClick={handleStart}
        style={buttonStyle}
        onMouseOver={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0 0 30px rgba(255,215,0,0.7)";
          e.target.style.backgroundColor = "#FFC000";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 0 20px rgba(255,215,0,0.3)";
          e.target.style.backgroundColor = "#FFD700";
        }}
      >
        Let's Start
      </button>
    </div>
  );
}