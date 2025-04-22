package com.rms.controller;

import com.rms.model.Notification;
import com.rms.model.User;
import com.rms.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public Notification addNotification(@RequestBody Notification notification) {
        return notificationService.saveNotification(notification);
    }

    @GetMapping("/seeker/{seekerId}")
    public List<Notification> getNotificationsBySeeker(@PathVariable Integer seekerId) {
        User seeker = new User();
        seeker.setUserId(seekerId);
        return notificationService.getNotificationsBySeeker(seeker);
    }

    @GetMapping("/referrer/{referrerId}")
    public List<Notification> getNotificationsByReferrer(@PathVariable Integer referrerId) {
        User referrer = new User();
        referrer.setUserId(referrerId);
        return notificationService.getNotificationsByReferrer(referrer);
    }
}
