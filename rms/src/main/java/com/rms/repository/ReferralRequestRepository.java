package com.rms.repository;

import com.rms.model.ReferralRequest;
import com.rms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReferralRequestRepository extends JpaRepository<ReferralRequest, Integer> {

    List<ReferralRequest> findBySeeker(User seeker);

    List<ReferralRequest> findByReferrer(User referrer);
}
