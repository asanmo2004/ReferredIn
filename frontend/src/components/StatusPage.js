import React, { useEffect, useState } from "react";
import axios from "axios";

function StatusPage() {
  const [notifications, setNotifications] = useState([]);
  const [seeker, setSeeker] = useState(null);
  const userEmail = localStorage.getItem("userEmail");

  // Fetch seeker user info
  useEffect(() => {
    const fetchSeeker = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/users/email/${userEmail}`);
        setSeeker(response.data);
      } catch (error) {
        console.error("Error fetching seeker:", error);
      }
    };
    if (userEmail) fetchSeeker();
  }, [userEmail]);

  // Fetch notifications for seeker
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!seeker) return;
      try {
        const response = await axios.get(`http://localhost:8090/notifications/seeker/${seeker.userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [seeker]);

  return (
    <>
      <style>{`
        .status-page-container {
          font-family: 'Poppins', sans-serif;
          min-height: 100vh;
          padding: 3rem;
          background: 
            linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 50, 0.6)),
            url('https://source.unsplash.com/1600x900/?network,feedback');
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
          padding: 1.5rem;
        }
        .card:hover {
          transform: translateY(-3px);
        }
        .status-accepted {
          color: green;
          font-weight: bold;
        }
        .status-rejected {
          color: red;
          font-weight: bold;
        }
      `}</style>

      <div className="container status-page-container">
        <h2 className="text-center mb-4">Your Referral Status</h2>
        <div className="row">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div key={notif.notificationId} className="col-md-6 col-lg-4 mb-4">
                <div className="card">
                  <h5 className="card-title">
                    {notif.referrer.name} has{" "}
                    <span
                      className={
                        notif.status === "Accepted"
                          ? "status-accepted"
                          : "status-rejected"
                      }
                    >
                      {notif.status.toLowerCase()}
                    </span>{" "}
                    your request.
                  </h5>
                  <p><strong>Company:</strong> {notif.referrer.companyName}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center fs-5">No notifications yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default StatusPage;
