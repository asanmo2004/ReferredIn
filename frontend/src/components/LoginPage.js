import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8090/users/login", {
        email,
        password,
      });
      setMessage("Login successful!");
      localStorage.setItem("userEmail", email); // store email
      navigate("/dashboard"); // redirect
    } catch (error) {
      setMessage("Invalid email or password");
    }
  };

  return (
    <>
      {/* Bootstrap & Fonts CDN */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" />

      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
        rel="stylesheet"
      />

      {/* Page Style */}
      <style>
        {`
          body {
            background: url('https://source.unsplash.com/1600x900/?corporate,office') no-repeat center center/cover;
            font-family: 'Poppins', sans-serif;
          }
          .login-card {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            width: 100%;
            max-width: 400px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
          }
          .form-control {
            border-radius: 8px;
          }
          .btn {
            font-weight: 600;
            transition: all 0.3s ease-in-out;
          }
          .btn:hover {
            transform: scale(1.05);
          }
          label {
            color: #000 !important;
            font-weight: 500;
          }
          a {
            color: #000;
            font-weight: 600;
          }
          a:hover {
            text-decoration: underline;
          }
        `}
      </style>

      {/* Login Form */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="login-card shadow-lg bg-white">
          <h2 className="mb-4 fw-bold text-dark">ReferredIn Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2">
              Login
            </button>
          </form>

          {message && <p className="mt-3 text-danger">{message}</p>}

          <p className="mt-3">
            New here? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
