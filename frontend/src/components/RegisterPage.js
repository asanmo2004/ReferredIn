import React, { useState, useEffect } from "react";
import axios from "axios";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    yearOfExperience: "",
    resumeLink: "",
    skill: { skillId: "" },
  });

  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch skills from backend
    axios.get("http://localhost:8090/skills")
      .then(response => {
        setSkills(response.data);
      })
      .catch(error => {
        console.error("Error fetching skills:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "skillId") {
      setFormData({ ...formData, skill: { skillId: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8090/users/register", formData);
      setMessage("Registration successful!");
    } catch (error) {
      setMessage("Registration failed.");
      console.error(error);
    }
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        body {
          background: url('https://source.unsplash.com/1600x900/?tech,developer') no-repeat center center/cover;
          font-family: 'Poppins', sans-serif;
        }
        .register-card {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 30px;
          border-radius: 15px;
          text-align: center;
          width: 100%;
          max-width: 500px;
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
          color: #000;
          font-weight: 500;
        }
      `}</style>

      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="register-card bg-white">
          <h2 className="mb-4 fw-bold text-dark">ReferredIn Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label>Name</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3 text-start">
              <label>Email</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3 text-start">
              <label>Password</label>
              <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="mb-3 text-start">
              <label>Company Name</label>
              <input type="text" className="form-control" name="companyName" value={formData.companyName} onChange={handleChange} />
            </div>
            <div className="mb-3 text-start">
              <label>Years of Experience</label>
              <input type="number" className="form-control" name="yearOfExperience" value={formData.yearOfExperience} onChange={handleChange} />
            </div>
            <div className="mb-3 text-start">
              <label>Resume Link</label>
              <input type="text" className="form-control" name="resumeLink" value={formData.resumeLink} onChange={handleChange} />
            </div>
            <div className="mb-3 text-start">
              <label>Skill</label>
              <select className="form-select" name="skillId" value={formData.skill.skillId} onChange={handleChange}>
                <option value="">Select a skill</option>
                {skills.map(skill => (
                  <option key={skill.skillId} value={skill.skillId}>
                    {skill.domain} - {skill.techStack}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-success w-100 py-2">Register</button>
          </form>
          {message && <p className="mt-3 text-danger">{message}</p>}
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
