package com.rms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "referral_requests")
public class ReferralRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer requestId;

    @ManyToOne
    @JoinColumn(name = "seeker_id", referencedColumnName = "userId")
    private User seeker;

    @ManyToOne
    @JoinColumn(name = "referrer_id", referencedColumnName = "userId")
    private User referrer;

    @Column(columnDefinition = "TEXT")
    private String message;

    // Getters and Setters
    public Integer getRequestId() { return requestId; }
    public void setRequestId(Integer requestId) { this.requestId = requestId; }

    public User getSeeker() { return seeker; }
    public void setSeeker(User seeker) { this.seeker = seeker; }

    public User getReferrer() { return referrer; }
    public void setReferrer(User referrer) { this.referrer = referrer; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
