import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../src/contexts/GameContext';

function MazePage() {
  const navigate = useNavigate();
  const { 
    currentMaze, 
    setCurrentMaze, 
    status, 
    setStatus,
    secondsRemaining,
    setSecondsRemaining,
    miliSecondsRemaining,
    setMiliSecondsRemaining,
    setHighScore,
    setInputString
  } = useGame();
  
  const [userAnswer, setUserAnswer] = useState('');
  const [isPathEntered, setIsPathEntered] = useState(false);
  const [showPath, setShowPath] = useState(true);
  const [finalScore, setFinalScore] = useState(0);
  const [canEnterPath, setCanEnterPath] = useState(false);

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#000033",
    backgroundImage: "linear-gradient(rgba(0, 0, 51, 0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 51, 0.9) 1px, transparent 1px)",
    backgroundSize: "20px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0"
  };

  const headerStyle = {
    width: "100%",
    backgroundColor: "#1a237e",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #FFD700"
  };

  const titleStyle = {
    color: "#FFD700",
    fontSize: "2rem",
    fontFamily: "'Press Start 2P', cursive",
    margin: 0,
    textShadow: "0 0 10px rgba(255, 215, 0, 0.3)"
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: "1rem"
  };

  const buttonStyle = {
    padding: "0.5rem 1.5rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.875rem",
    transition: "all 0.3s ease"
  };

  const contentContainerStyle = {
    width: "100%",
    maxWidth: "1200px",
    margin: "2rem auto",
    padding: "0 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  const mazeContainerStyle = {
    backgroundColor: "rgba(0, 0, 51, 0.8)",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 0 30px rgba(255, 215, 0, 0.2)",
    marginBottom: "2rem",
    border: "4px solid #FFD700"
  };

  const mazeGridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${currentMaze?.matrix?.length || 5}, 1fr)`,
    gap: "4px",
    backgroundColor: "rgba(0, 0, 51, 0.5)",
    padding: "8px",
    borderRadius: "0.5rem"
  };

  const cellStyle = {
    width: "40px",
    height: "40px",
    backgroundColor: "#000033",
    border: "2px solid #FFD700",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease"
  };

  const inputContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    width: "100%",
    maxWidth: "400px"
  };

  const inputStyle = {
    width: "100%",
    padding: "1rem",
    fontSize: "1rem",
    borderRadius: "0.75rem",
    border: "2px solid #FFD700",
    backgroundColor: "rgba(0, 0, 51, 0.7)",
    color: "#FFD700",
    outline: "none",
    transition: "all 0.3s ease",
    fontFamily: "'Press Start 2P', cursive",
    textTransform: "uppercase"
  };

  const submitButtonStyle = {
    width: "100%",
    padding: "1rem",
    backgroundColor: "#000033",
    color: "#FFD700",
    border: "2px solid #FFD700",
    borderRadius: "0.75rem",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"
  };

  const timerStyle = {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "2rem",
    color: "#FFD700",
    textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
    marginBottom: "2rem"
  };

  useEffect(() => {
    let timer;
    if (status === "active" && !isPathEntered) {
      timer = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            setStatus("finished");
            setInputString("");
            navigate('/finish');
            return 0;
          }
          return prev - 1;
        });

        setMiliSecondsRemaining(prev => {
          const newValue = prev - 1000;
          if (newValue <= 0) {
            clearInterval(timer);
            setStatus("finished");
            setInputString("");
            navigate('/finish');
            return 0;
          }
          return newValue;
        });
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [status, isPathEntered, setSecondsRemaining, setMiliSecondsRemaining, setStatus, navigate, setInputString]);

  const handleEnterPath = (e) => {
    e.preventDefault();
    setIsPathEntered(true);
    setShowPath(false);
    setCanEnterPath(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer.trim()) {
      setStatus("finished");
      setInputString(userAnswer.trim().toUpperCase());
      const score = miliSecondsRemaining;
      setHighScore(score);
      navigate('/finish');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={contentContainerStyle}>
        <div style={timerStyle}>
          {secondsRemaining}s
        </div>

        <div style={mazeContainerStyle}>
          <div style={mazeGridStyle}>
            {currentMaze?.matrix?.flat().map((cell, index) => (
              <div 
                key={index} 
                style={{
                  ...cellStyle,
                  backgroundColor: !showPath ? "#000033" : 
                                 cell === 1 ? "#FFD700" : 
                                 cell === "P" ? "#4CAF50" : "#000033",
                  boxShadow: !showPath ? "none" :
                            cell === 1 ? "0 0 10px rgba(255, 215, 0, 0.5)" : 
                            cell === "P" ? "0 0 10px rgba(76, 175, 80, 0.5)" : "none"
                }}
              >
                {cell === "🐰" && (
                  <span role="img" aria-label="start" style={{ fontSize: "1.5rem" }}>
                    🐰
                  </span>
                )}
                {cell === "🚩" && (
                  <span role="img" aria-label="end" style={{ fontSize: "1.5rem" }}>
                    🚩
                  </span>
                )}
                {cell === "P" && showPath && (
                  <div style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#4CAF50",
                    borderRadius: "50%",
                    boxShadow: "0 0 10px rgba(76, 175, 80, 0.5)"
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={isPathEntered ? handleSubmit : handleEnterPath} style={inputContainerStyle}>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
            placeholder="Enter path..."
            style={{
              ...inputStyle,
              opacity: canEnterPath ? 1 : 0.5,
              cursor: canEnterPath ? "text" : "not-allowed"
            }}
            disabled={!canEnterPath}
          />
          <button
            type="submit"
            style={submitButtonStyle}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#FFD700";
              e.target.style.color = "#000033";
              e.target.style.boxShadow = "0 0 20px rgba(255, 215, 0, 0.5)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#000033";
              e.target.style.color = "#FFD700";
              e.target.style.boxShadow = "0 0 20px rgba(255, 215, 0, 0.2)";
            }}
          >
            {isPathEntered ? "Submit" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MazePage;
