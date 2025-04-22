import React, { useEffect, useState } from "react";
import axios from "axios";

function SeekPage() {
  const [users, setUsers] = useState([]);
  const [seeker, setSeeker] = useState(null);  // store seeker user object
  const [messages, setMessages] = useState({}); // store messages keyed by referrer userId
  const userEmail = localStorage.getItem("userEmail");

  // Fetch seeker user info once by email
  useEffect(() => {
    const fetchSeeker = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/users/email/${userEmail}`);
        setSeeker(response.data); // expects full user object including userId
      } catch (error) {
        console.error("Error fetching seeker user:", error);
      }
    };

    if (userEmail) {
      fetchSeeker();
    }
  }, [userEmail]);

  // Fetch list of other users for referral
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/users/seek_referral/${userEmail}`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (userEmail) {
      fetchUsers();
    }
  }, [userEmail]);

  // Handle message text change for a specific referrer user
  const handleMessageChange = (userId, value) => {
    setMessages((prev) => ({
      ...prev,
      [userId]: value,
    }));
  };

  // Handle send referral request click
  const handleSendClick = async (referrerUser) => {
    if (!seeker) {
      alert("Seeker user data not loaded yet.");
      return;
    }

    const message = messages[referrerUser.userId] || "";

    if (message.trim() === "") {
      alert("Please enter a message before sending.");
      return;
    }

    const referralRequest = {
      seeker: { userId: seeker.userId },
      referrer: { userId: referrerUser.userId },
      message: message.trim(),
    };

    try {
      await axios.post("http://localhost:8090/referrals/send", referralRequest);
      alert(`Referral request sent to ${referrerUser.name}!`);
      // Optionally clear message box for this user
      setMessages((prev) => ({ ...prev, [referrerUser.userId]: "" }));
    } catch (error) {
      console.error("Error sending referral request:", error);
      alert("Failed to send referral request. Try again.");
    }
  };

  return (
    <>
      {/* Google Fonts - Poppins */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
        rel="stylesheet"
      />
      {/* Styling */}
      <style>{`
        .seek-page-container {
          font-family: 'Poppins', sans-serif;
          min-height: 100vh;
          padding-top: 3rem;
          padding-bottom: 3rem;
          background: 
            linear-gradient(
              rgba(0, 0, 50, 0.6), 
              rgba(0, 0, 50, 0.6)
            ),
            url('https://source.unsplash.com/1600x900/?technology,office');
          background-size: cover;
          background-position: center;
          color: #fff;
        }
        .card {
          background: rgba(255, 255, 255, 0.95);
          color: #222;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
        }
        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }
        a {
          color: #007bff;
          font-weight: 600;
        }
        a:hover {
          color: #0056b3;
          text-decoration: underline;
        }
        h2 {
          font-weight: 700;
          text-shadow: 2px 2px 6px rgba(0,0,0,0.7);
        }
        p {
          font-weight: 500;
        }
        textarea.message-box {
          margin-top: 1rem;
          resize: vertical;
          min-height: 80px;
          border-radius: 8px;
          border: 1px solid #ccc;
          padding: 0.5rem;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
        }
        button.btn-primary {
          margin-top: auto;
          align-self: flex-start;
        }
      `}</style>

      <div className="container seek-page-container">
        <h2 className="mb-4 text-center">Seek Referral</h2>
        <div className="row">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.userId} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm h-100">
                  <h5 className="card-title">{user.name}</h5>
                  <p><strong>Company:</strong> {user.companyName}</p>
                  <p><strong>Experience:</strong> {user.yearOfExperience} yrs</p>
                  <textarea
                    className="message-box"
                    placeholder="Type your message"
                    value={messages[user.userId] || ""}
                    onChange={(e) => handleMessageChange(user.userId, e.target.value)}
                  ></textarea>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSendClick(user)}
                  >
                    Send
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center fs-5">No users available or still loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SeekPage;
