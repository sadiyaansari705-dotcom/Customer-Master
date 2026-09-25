package com.customermaster;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class CustomerActivity {

    @Id
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "customer_activity_seq"
    )
    @SequenceGenerator(
        name = "customer_activity_seq",
        sequenceName = "CUSTOMER_ACTIVITY_SEQ",
        allocationSize = 1
    )
    @Column(name = "ACTIVITY_ID")
    private Long activityId;

    @Column(name = "CUSTOMER_ID")
    private Long customerId;

    @Column(name = "CUSTOMER_NAME")
    private String customerName;

    @Column(name = "ACTIVITY_TYPE")
    private String activityType;

    @Column(name = "ACTIVITY_TIME")
    private LocalDateTime activityTime;

    public CustomerActivity() {
    }

    public Long getActivityId() {
        return activityId;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getActivityType() {
        return activityType;
    }

    public void setActivityType(String activityType) {
        this.activityType = activityType;
    }

    public LocalDateTime getActivityTime() {
        return activityTime;
    }

    public void setActivityTime(LocalDateTime activityTime) {
        this.activityTime = activityTime;
    }
}