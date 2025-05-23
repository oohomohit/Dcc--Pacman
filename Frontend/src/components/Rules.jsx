function Rules() {
  return (
    <div style={{ width: "100%", background: "#f5bb2a", borderRadius: "10px", padding: "2rem", marginTop: "2rem", color: "#010658", fontWeight: 500, fontSize: "1.3rem" }}>
      <h1 style={{ width: "100%", display: "flex", justifyContent: "center", color: "#b42621", fontWeight: 700, fontSize: "2rem" }}>Rules</h1>
      <p style={{ marginTop: "1.5rem", lineHeight: 1.7 }}>
        Navigate the maze by typing:<br/>
        "U" for Up<br/>
        "D" for Down<br/>
        "L" for Left<br/>
        "R" for Right<br/>
        <br/>
        Progress through levels: Easy → Medium → Hard.<br/>
        Input a string of directions (e.g., "RLUD") to guide Pacman.<br/>
        Each participant can join multiple slots but not the same slot twice.<br/>
        Ensure adherence to rules to avoid disqualification.
      </p>
    </div>
  );
}

export default Rules;
