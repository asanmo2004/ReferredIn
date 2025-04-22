package com.rms.repository;

import com.rms.model.Notification;
import com.rms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    List<Notification> findBySeeker(User seeker);

    List<Notification> findByReferrer(User referrer);
}
