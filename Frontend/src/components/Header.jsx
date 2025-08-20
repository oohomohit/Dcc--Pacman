import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";

function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    navigate("/");
  }

  function handleProfile() {
    navigate("/profile");
  }

  return (
    <header style={{
      padding: '1rem 1.5rem', // Increased padding slightly
      backgroundColor: '#1A237E', // Dark blue background for header
      color: 'white', // White text for header elements
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '3px solid #FFA000' // Orange accent border
    }}>
      <div 
        onClick={() => navigate("/start")} 
        style={{ 
          cursor: 'pointer', 
          fontWeight: 'bold', 
          fontSize: '1.5rem', // Larger font size for title
          fontFamily: "'Press Start 2P', cursive" // Arcade font for title
        }}
        title="Go to Game Start"
      >
        PACMAN ARCADE 
      </div>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        {/* <button
          onClick={handleProfile}
          style={{
            backgroundColor: '#007BFF', // Blue background
            color: 'white', // White text
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontFamily: "'VT323', monospace" // Consistent retro font
          }}
        >
          Profile
        </button> */}
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#007BFF', // Blue background
            color: 'white', // White text
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontFamily: "'VT323', monospace" // Consistent retro font
          }}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
