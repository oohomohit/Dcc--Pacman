import { useNavigate } from "react-router-dom";
import { useGame } from "../src/contexts/GameContext";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { API_URL } from '../src/config';

function FinishScreen() {
  const navigate = useNavigate();
  const {
    secondsRemaining,
    miliSecondsRemaining,
    inputString,
    currentMaze,
    mazeSize,
    difficulty,
    setSecondsRemaining,
    setUserName,
    setEnroll,
    setStatus,
    setMazeSize,
  } = useGame();

  const [uss, setUss] = useState(null);
  const [answerError, setAnswerError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Styles
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
    maxWidth: "42rem",
    backgroundColor: "#1a1a4d",
    padding: "2rem",
    borderRadius: "1rem",
    border: "4px solid #FFD700",
    boxShadow: "0 0 40px rgba(255,215,0,0.4)",
    transition: "transform 0.3s ease"
  };

  const titleStyle = {
    fontSize: "3rem",
    fontFamily: "'Press Start 2P', cursive",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: "2rem",
    animation: "pulse 2s infinite"
  };

  const resultContainerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: "1.5rem",
    borderRadius: "1rem",
    marginBottom: "2rem",
    border: "2px solid rgba(255, 215, 0, 0.3)",
    boxShadow: "0 0 20px rgba(255,215,0,0.2)",
    transition: "all 0.3s ease"
  };

  const scoreStyle = {
    fontSize: "2rem",
    fontFamily: "'Press Start 2P', cursive",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: "1.5rem"
  };

  const pathContainerStyle = {
    backgroundColor: "rgba(0, 0, 51, 0.3)",
    padding: "1rem",
    borderRadius: "0.75rem",
    marginBottom: "1rem",
    border: "2px solid rgba(255, 215, 0, 0.2)"
  };

  const pathLabelStyle = {
    color: "#FFD700",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.875rem",
    marginBottom: "0.5rem"
  };

  const pathValueStyle = {
    fontFamily: "monospace",
    fontSize: "1rem",
    wordBreak: "break-all"
  };

  const yourPathStyle = {
    ...pathValueStyle,
    color: "#FF6B6B"
  };

  const expectedPathStyle = {
    ...pathValueStyle,
    color: "#4CAF50"
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
    marginTop: "1rem",
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
    animation: "pulse 2s infinite",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.875rem"
  };

  const loadingStyle = {
    color: "#FFD700",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "1.5rem",
    animation: "pulse 2s infinite",
    textAlign: "center"
  };

  // Game result calculation
  const gameResult = useMemo(() => {
    if (!currentMaze?.Start || !currentMaze?.matrix) {
      return {
        points: 0,
        Ans: false,
        row: -1,
        col: -1,
        pathForDisplay: "Loading..."
      };
    }

    let currentAns = true;
    let currentRow = currentMaze.Start[0];
    let currentCol = currentMaze.Start[1];
    let calculatedPoints = 0;

    for (let i = 0; i < inputString.length; i++) {
      const move = inputString[i];
      if (!['U', 'D', 'L', 'R'].includes(move)) {
        currentAns = false;
        break;
      }

      let newRow = currentRow;
      let newCol = currentCol;

      switch (move) {
        case 'U': newRow--; break;
        case 'D': newRow++; break;
        case 'L': newCol--; break;
        case 'R': newCol++; break;
      }

      if (newRow < 0 || newCol < 0 || newRow >= mazeSize || newCol >= mazeSize || 
          currentMaze.matrix[newRow][newCol] === 0) {
        currentAns = false;
        break;
      }

      currentRow = newRow;
      currentCol = newCol;
    }

    if (currentAns && currentMaze.matrix[currentRow]?.[currentCol] === "🚩") {
      calculatedPoints = Math.round((secondsRemaining * 1000) + miliSecondsRemaining);
    }

    return {
      points: calculatedPoints,
      Ans: currentAns,
      row: currentRow,
      col: currentCol,
      pathForDisplay: currentMaze.Path
    };
  }, [currentMaze, inputString, mazeSize, secondsRemaining, miliSecondsRemaining]);

  const { points, Ans, row, col, pathForDisplay } = gameResult;

  // Effects
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.post(`${API_URL}/me`, { token })
      .then((res) => {
        setUss(res.data.user);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!uss || !difficulty) return;
    
    const id = uss._id;
    axios.post(`${API_URL}/update`, { difficulty, points, id })
      .then((res) => {
        console.log(res.data.message || res.data.msg || "Score saved!");
      })
      .catch((err) => {
        console.error("Failed to save score:", err);
      });
  }, [uss, points, difficulty]);

  useEffect(() => {
    if (!currentMaze) {
      setAnswerError("");
      return;
    }

    if (!Ans && inputString.length > 0) {
      setAnswerError("Incorrect path or invalid input characters!");
    } else if (Ans && points === 0 && inputString.length > 0 &&
               (!currentMaze.matrix[row] || currentMaze.matrix[row][col] !== "🚩")) {
      setAnswerError("Path did not lead to the target flag 🚩.");
    } else {
      setAnswerError("");
    }
  }, [inputString, Ans, points, currentMaze, row, col]);

  const handleRestart = () => {
    setSecondsRemaining(30);
    setStatus("loading");
    setMazeSize(5);
    setEnroll("");
    setUserName("");
    navigate("/start");
  };

  // Get appropriate emoji based on score
  const getEmoji = () => {
    if (!currentMaze) return "⏳";
    if (points === 0 && inputString.length > 0) return "🤯";
    if (points === 0 && inputString.length === 0) return "🤔";
    if (points >= 20000) return "🏆";
    if (points >= 10000) return "🥇";
    if (points >= 5000) return "🥳";
    if (points > 0) return "🫠";
    return "🤨";
  };

  if (isLoading || !currentMaze?.Start || !currentMaze?.matrix) {
    return (
      <div style={containerStyle}>
        <div style={gridBackgroundStyle}></div>
        <div style={cardStyle}>
          <div style={loadingStyle}>
            Loading results...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={gridBackgroundStyle}></div>

      <div style={cardStyle}>
        <h1 style={titleStyle}>
          Game Over! {getEmoji()}
        </h1>

        {answerError && (
          <div style={errorStyle}>
            {answerError}
          </div>
        )}

        <div style={resultContainerStyle}>
          <div style={scoreStyle}>
            Final Score: {points}
          </div>
          
          <div style={pathContainerStyle}>
            <div style={pathLabelStyle}>Your Path:</div>
            <div style={yourPathStyle}>{inputString || "No moves made"}</div>
          </div>

          <div style={pathContainerStyle}>
            <div style={pathLabelStyle}>Expected Path:</div>
            <div style={expectedPathStyle}>{pathForDisplay}</div>
          </div>
        </div>

        <button
          onClick={handleRestart}
          style={buttonStyle}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 0 30px rgba(255,215,0,0.7)";
            e.target.style.backgroundColor = "#FFC000";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 0 20px rgba(255,215,0,0.5)";
            e.target.style.backgroundColor = "#FFD700";
          }}
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}

export default FinishScreen;
