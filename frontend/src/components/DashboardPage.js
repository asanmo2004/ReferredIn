import React from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  return (
    <>
      {/* Bootstrap & Google Fonts CDN */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        defer
      ></script>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
        rel="stylesheet"
      />

      {/* Inline Styling */}
      <style>
        {`
          body {
            background: url('https://source.unsplash.com/1600x900/?corporate,teamwork') no-repeat center center/cover;
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
          }

          .dashboard-card {
            background: rgba(255, 255, 255, 0.85);
            border: 1px solid rgba(0, 0, 0, 0.1);
            padding: 40px;
            border-radius: 15px;
            width: 100%;
            max-width: 500px;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
            text-align: center;
          }

          .btn {
            font-weight: 600;
            transition: all 0.3s ease-in-out;
          }

          .btn:hover {
            transform: scale(1.05);
          }

          h1 {
            color: #1a1a1a;
            font-weight: 700;
          }

          h5 {
            color: #333;
          }
        `}
      </style>

      {/* Main Content */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="dashboard-card">
          <h1 className="mb-4">Welcome Buddy!</h1>
          <h5 className="mb-4">Logged in as: {userEmail}</h5>
          <div className="d-grid gap-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/seek-referral")}
            >
              Seek Referral
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/manage-referrals")}
            >
              Manage Referrals
            </button>
            <button
              className="btn btn-outline-success"
              onClick={() => navigate("/status")}
            >
              Status
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
