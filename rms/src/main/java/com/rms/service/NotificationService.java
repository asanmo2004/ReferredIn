package com.rms.service;

import com.rms.model.Notification;
import com.rms.model.User;
import com.rms.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsBySeeker(User seeker) {
        return notificationRepository.findBySeeker(seeker);
    }

    public List<Notification> getNotificationsByReferrer(User referrer) {
        return notificationRepository.findByReferrer(referrer);
    }
}
