import React, { useEffect, useState } from "react";
import axios from "axios";

function ManagePage() {
  const [referralRequests, setReferralRequests] = useState([]);
  const [referrer, setReferrer] = useState(null);
  const userEmail = localStorage.getItem("userEmail");

  // Fetch logged-in user (referrer)
  useEffect(() => {
    const fetchReferrer = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/users/email/${userEmail}`);
        setReferrer(response.data);
      } catch (error) {
        console.error("Error fetching referrer:", error);
      }
    };
    if (userEmail) fetchReferrer();
  }, [userEmail]);

  // Fetch incoming referral requests
  useEffect(() => {
    const fetchReferrals = async () => {
      if (!referrer) return;
      try {
        const response = await axios.get(`http://localhost:8090/referrals/referrer/${referrer.userId}`);
        setReferralRequests(response.data);
      } catch (error) {
        console.error("Error fetching referrals:", error);
      }
    };
    fetchReferrals();
  }, [referrer]);

  // Handle Accept or Decline
  const handleAction = async (request, status) => {
    try {
      // Send notification
      await axios.post("http://localhost:8090/notifications", {
        seeker: { userId: request.seeker.userId },
        referrer: { userId: referrer.userId },
        status: status,
      });

      // Delete the referral request
      await axios.delete(`http://localhost:8090/referrals/${request.requestId}`);

      // Update UI
      setReferralRequests(prev => prev.filter(req => req.requestId !== request.requestId));
      alert(`Referral ${status.toLowerCase()} successfully.`);
    } catch (error) {
      console.error("Error processing action:", error);
    }
  };

  return (
    <>
      <style>{`
        .manage-page-container {
          font-family: 'Poppins', sans-serif;
          min-height: 100vh;
          padding: 3rem;
          background: 
            linear-gradient(rgba(0, 0, 50, 0.6), rgba(0, 0, 50, 0.6)),
            url('https://source.unsplash.com/1600x900/?technology,teamwork');
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
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }
        a {
          color: #007bff;
          font-weight: 600;
        }
        a:hover {
          text-decoration: underline;
        }
        .btn-accept {
          background-color: #28a745;
          color: white;
          margin-right: 0.5rem;
        }
        .btn-decline {
          background-color: #dc3545;
          color: white;
        }
      `}</style>

      <div className="container manage-page-container">
        <h2 className="text-center mb-4">Manage Referrals</h2>
        <div className="row">
          {referralRequests.length > 0 ? (
            referralRequests.map((request) => (
              <div key={request.requestId} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <h5 className="card-title">{request.seeker.name}</h5>
                  <p><strong>Company:</strong> {request.seeker.companyName}</p>
                  <p><strong>Experience:</strong> {request.seeker.yearOfExperience} yrs</p>
                  <p>
                    <strong>Resume:</strong>{" "}
                    <a
                      href={request.seeker.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </p>
                  <p><strong>Message:</strong> {request.message}</p>
                  <div className="d-flex mt-auto">
                    <button
                      className="btn btn-accept"
                      onClick={() => handleAction(request, "Accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-decline"
                      onClick={() => handleAction(request, "Rejected")}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center fs-5">No incoming referral requests yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ManagePage;
