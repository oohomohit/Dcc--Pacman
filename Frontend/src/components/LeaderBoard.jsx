import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from '../config';

function LeaderBoard() {

  const [EasyDummydata, setEasyData] = useState([]);
  const [MediumDummydata, setMediumData] = useState([]);
  const [HardDummydata, setHardData] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/leaderboard`)
      .then((res) => {
        setEasyData(res.data.data.easyScore);
        setMediumData(res.data.data.mediumScore);
        setHardData(res.data.data.hardScore);
        setReady(true);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!ready) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-2xl font-['Press_Start_2P'] text-[#2c3e50] animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  // Sort data by points
  EasyDummydata?.sort((a, b) => b.points - a.points);
  MediumDummydata?.sort((a, b) => b.points - a.points);
  HardDummydata?.sort((a, b) => b.points - a.points);

  const containerStyle = {
    width: "100%",
    overflowX: "auto"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 0.5rem"
  };

  const headerStyle = {
    color: "#FFD700",
    fontSize: "1.25rem",
    fontFamily:  "Press Start 2P",
    textAlign: "left",
    padding: "1rem",
    borderBottom: "2px solid rgba(255, 215, 0, 0.3)"
  };

  const sectionTitleStyle = {
    color: "#FFD700",
    fontSize: "1.5rem",
    fontFamily:  "Press Start 2P",
    padding: "1rem 0",
    borderBottom: "2px solid rgba(255, 215, 0, 0.3)",
    marginTop: "2rem"
  };

  const cellStyle = {
    color: "#FFD700",
    padding: "1rem",
    fontSize: "1rem",
    fontFamily:  "Press Start 2P"
  };

  const rowStyle = {
    backgroundColor: "rgba(0, 0, 51, 0.3)",
    transition: "all 0.3s ease"
  };

  // Function to mask phone number
  const maskPhoneNumber = (phone) => {
    return phone ? `${phone.slice(0, 2)}****${phone.slice(-4)}` : '';
  };

  const renderTable = (data, level) => (
    <div className="mb-8 last:mb-0">
      <h3 className="text-2xl font-['Press_Start_2P'] text-[#2c3e50] mb-4 pb-2
                    border-b-2 border-[#FFD700]/30">
        {level} Level
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-lg text-[#2c3e50] border-b-2 border-[#FFD700]/20">
              <th className="py-3 px-4 text-left">Rank</th>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Points</th>
              <th className="py-3 px-4 text-left">Enrollment</th>
              <th className="py-3 px-4 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 3).map((user, idx) => (
              <tr key={idx} 
                  className="hover:bg-[#FFD700]/5 transition-colors duration-150
                           border-b border-[#FFD700]/10 last:border-none">
                <td className="py-3 px-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full
                                 bg-[#FFD700]/10 text-[#2c3e50] font-bold">
                    {idx + 1}
                  </span>
                </td>
                <td className="py-3 px-4 font-bold text-[#2c3e50]">{user.username}</td>
                <td className="py-3 px-4 font-mono text-[#FFD700] font-bold">
                  {user.points !== null ? user.points : 0}
                </td>
                <td className="py-3 px-4 font-mono">{user.enroll}</td>
                <td className="py-3 px-4 font-mono">{maskPhoneNumber(user.phone)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div style={containerStyle}>
      {renderTable(EasyDummydata, "Easy")}
      {renderTable(MediumDummydata, "Medium")}
      {renderTable(HardDummydata, "Hard")}
    </div>
  );
}

export default LeaderBoard;
