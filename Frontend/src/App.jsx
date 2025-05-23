import StartScreen from "../pages/StartScreen";
import MazePage from "../pages/MazePage";
import FinishScreen from "../pages/FinishScreen";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        
        {/* Protected Routes */}
        <Route path="start" element={
          <ProtectedRoute>
            <Header />
            <StartScreen />
          </ProtectedRoute>
        } />
        
        <Route path="mazepage" element={
          <ProtectedRoute>
            <Header />
            <MazePage />
          </ProtectedRoute>
        } />
        
        <Route path="finish" element={
          <ProtectedRoute>
            <Header />
            <FinishScreen />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
