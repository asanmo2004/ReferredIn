package com.rms.controller;

import com.rms.model.ReferralRequest;
import com.rms.model.User;
import com.rms.service.ReferralRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/referrals")
public class ReferralRequestController {

    @Autowired
    private ReferralRequestService referralRequestService;

    @PostMapping("/send")
    public ReferralRequest sendReferralRequest(@RequestBody ReferralRequest referralRequest) {
        return referralRequestService.sendRequest(referralRequest);
    }

    @GetMapping("/seeker/{seekerId}")
    public List<ReferralRequest> getRequestsBySeeker(@PathVariable Integer seekerId) {
        User seeker = new User();
        seeker.setUserId(seekerId);
        return referralRequestService.getRequestsBySeeker(seeker);
    }

    @GetMapping("/referrer/{referrerId}")
    public List<ReferralRequest> getRequestsByReferrer(@PathVariable Integer referrerId) {
        User referrer = new User();
        referrer.setUserId(referrerId);
        return referralRequestService.getRequestsByReferrer(referrer);
    }

    @DeleteMapping("/{id}")
    public String deleteReferralRequest(@PathVariable Integer id) {
        referralRequestService.deleteReferralRequestById(id);
        return "Referral request with ID " + id + " has been deleted.";
    }
}
