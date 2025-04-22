import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage"; 
import DashboardPage from "./components/DashboardPage";
import SeekPage from "./components/SeekPage";
import ManagePage from "./components/ManagePage";
import StatusPage from "./components/StatusPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/seek-referral" element={<SeekPage />} />
        <Route path="/manage-referrals" element={<ManagePage />} />
        <Route path="/status" element={<StatusPage />} />
      </Routes>
    </Router>
  )
}

export default App;
