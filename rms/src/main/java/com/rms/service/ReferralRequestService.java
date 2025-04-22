package com.rms.service;

import com.rms.model.ReferralRequest;
import com.rms.model.User;
import com.rms.repository.ReferralRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReferralRequestService {

    @Autowired
    private ReferralRequestRepository referralRequestRepository;

    public ReferralRequest sendRequest(ReferralRequest referralRequest) {
        return referralRequestRepository.save(referralRequest);
    }

    public List<ReferralRequest> getRequestsBySeeker(User seeker) {
        return referralRequestRepository.findBySeeker(seeker);
    }

    public List<ReferralRequest> getRequestsByReferrer(User referrer) {
        return referralRequestRepository.findByReferrer(referrer);
    }

    public void deleteReferralRequestById(Integer requestId) {
        referralRequestRepository.deleteById(requestId);
    }
}
