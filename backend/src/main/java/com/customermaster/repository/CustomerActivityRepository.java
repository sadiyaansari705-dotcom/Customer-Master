package com.customermaster.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.customermaster.CustomerActivity;

public interface CustomerActivityRepository
        extends JpaRepository<CustomerActivity, Long> {

    // Count activities by type
    long countByActivityType(String activityType);

    // Count activities created between two times
    long countByActivityTypeAndActivityTimeGreaterThanEqualAndActivityTimeLessThan(
            String activityType,
            LocalDateTime start,
            LocalDateTime end
    );

    // Get all activities in oldest-to-newest order
    List<CustomerActivity> findAllByOrderByActivityIdAsc();
}