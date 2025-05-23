import Rules from "../src/components/Rules";
import LeaderBoard from "../src/components/LeaderBoard";
import { DifficultyLevel } from "../src/components/DifficultyLevel";

function StartScreen() {
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

  const mainCardStyle = {
    position: "relative",
    zIndex: 10,
    width: "100%",
    maxWidth: "64rem",
    backgroundColor: "#1a1a4d",
    padding: "2rem",
    borderRadius: "1rem",
    border: "4px solid #FFD700",
    boxShadow: "0 0 40px rgba(255,215,0,0.4)",
    transition: "transform 0.3s ease"
  };

  const titleContainerStyle = {
    position: "relative",
    width: "100%",
    marginBottom: "2rem",
    textAlign: "center"
  };

  const titleStyle = {
    fontSize: "4rem",
    fontFamily: "'Press Start 2P', cursive",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: "1rem",
    position: "relative",
    zIndex: 10,
    padding: "1rem",
    animation: "pulse 2s infinite"
  };

  const titleUnderlineStyle = {
    position: "absolute",
    top: "50%",
    left: 0,
    width: "100%",
    height: "2px",
    background: "linear-gradient(90deg, transparent, #FFD700, transparent)",
    transform: "translateY(-50%)",
    opacity: 0.5
  };

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "1.5rem",
    "@media (min-width: 768px)": {
      gridTemplateColumns: "repeat(2, 1fr)"
    }
  };

  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    border: "2px solid rgba(255, 215, 0, 0.3)",
    boxShadow: "0 0 20px rgba(255,215,0,0.2)",
    transition: "all 0.3s ease",
    height: "100%"
  };

  const cardTitleStyle = {
    fontSize: "1.5rem",
    fontFamily: "'Press Start 2P', cursive",
    color: "#FFD700",
    marginBottom: "1rem"
  };

  const leaderboardCardStyle = {
    ...cardStyle,
    gridColumn: "1 / -1"
  };

  return (
    <div style={containerStyle}>
      <div style={gridBackgroundStyle}></div>

      <div style={mainCardStyle}>
        <div style={titleContainerStyle}>
          <h2 style={titleStyle}>PACMAN</h2>
          <div style={titleUnderlineStyle}></div>
        </div>
        
        <div style={gridContainerStyle}>
          <div 
            style={leaderboardCardStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.01)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(255,215,0,0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255,215,0,0.2)";
            }}
          >
            <h3 style={cardTitleStyle}>Leaderboard</h3>
            <LeaderBoard />
          </div>
          
          <div 
            style={cardStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.01)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(255,215,0,0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255,215,0,0.2)";
            }}
          >
            <h3 style={cardTitleStyle}>Rules</h3>
            <Rules />
          </div>
          
          <div 
            style={cardStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.01)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(255,215,0,0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255,215,0,0.2)";
            }}
          >
            <h3 style={cardTitleStyle}>Game Settings</h3>
            <DifficultyLevel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
