package com.rms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer notificationId;

    @ManyToOne
    @JoinColumn(name = "seeker_id", referencedColumnName = "userId")
    private User seeker;

    @ManyToOne
    @JoinColumn(name = "referrer_id", referencedColumnName = "userId")
    private User referrer;

    private String status;  // Accepted or Rejected

    // Getters and Setters
    public Integer getNotificationId() { return notificationId; }
    public void setNotificationId(Integer notificationId) { this.notificationId = notificationId; }

    public User getSeeker() { return seeker; }
    public void setSeeker(User seeker) { this.seeker = seeker; }

    public User getReferrer() { return referrer; }
    public void setReferrer(User referrer) { this.referrer = referrer; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
