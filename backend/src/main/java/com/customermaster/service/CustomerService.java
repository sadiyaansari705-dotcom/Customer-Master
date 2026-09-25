package com.customermaster.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.customermaster.Customer;
import com.customermaster.CustomerActivity;
import com.customermaster.CustomerStatistics;
import com.customermaster.repository.CustomerRepository;
import com.customermaster.repository.CustomerActivityRepository;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    private final CustomerActivityRepository activityRepository;


    public CustomerService(
            CustomerRepository customerRepository,
            CustomerActivityRepository activityRepository) {

        this.customerRepository = customerRepository;
        this.activityRepository = activityRepository;
    }


    // =========================
    // GET ALL CUSTOMERS
    // =========================

    public List<Customer> getAllCustomers() {

        return customerRepository.findAllByOrderByIdAsc();
    }


    // =========================
    // GET CUSTOMER BY ID
    // =========================

    public Customer getCustomerById(Long id) {

        return customerRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Customer not found with id: " + id
                    )
                );
    }


    // =========================
    // ADD / SAVE CUSTOMER
    // =========================

    public Customer saveCustomer(Customer customer) {

        // Check whether this is a NEW customer
        boolean isNewCustomer = (customer.getId() == null);

        // Save customer
        Customer savedCustomer =
                customerRepository.save(customer);


        // Save ADD activity for new customer
        if (isNewCustomer) {

            CustomerActivity activity =
                    new CustomerActivity();

            activity.setCustomerId(
                    savedCustomer.getId()
            );

            activity.setCustomerName(
                    savedCustomer.getFirstName()
                    + " "
                    + savedCustomer.getLastName()
            );

            activity.setActivityType("ADD");

            activity.setActivityTime(
                    LocalDateTime.now()
            );

            activityRepository.saveAndFlush(activity);
        }


        return savedCustomer;
    }


    // =========================
    // DELETE CUSTOMER
    // =========================

    public void deleteCustomer(Long id) {

        // First get customer details
        Customer customer =
                customerRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Customer not found with id: " + id
                    )
                );


        // Create DELETE activity
        CustomerActivity activity =
                new CustomerActivity();

        activity.setCustomerId(
                customer.getId()
        );

        activity.setCustomerName(
                customer.getFirstName()
                + " "
                + customer.getLastName()
        );

        activity.setActivityType("DELETE");

        activity.setActivityTime(
                LocalDateTime.now()
        );


        // Save activity before deleting customer
        activityRepository.saveAndFlush(activity);


        // Delete customer
        customerRepository.deleteById(id);
    }


    // =========================
    // GET STATISTICS
    // =========================

    public CustomerStatistics getStatistics() {

        // Total customers currently in database
        long totalCustomers =
                customerRepository.count();


        // Currently active records
        long activeRecords =
                totalCustomers;


        // Start of today
        LocalDateTime startOfToday =
                LocalDate.now().atStartOfDay();


        // Start of tomorrow
        LocalDateTime startOfTomorrow =
                LocalDate.now()
                        .plusDays(1)
                        .atStartOfDay();


        // Customers added today
        long addedToday =
                activityRepository
                .countByActivityTypeAndActivityTimeGreaterThanEqualAndActivityTimeLessThan(
                        "ADD",
                        startOfToday,
                        startOfTomorrow
                );


        // Total deleted records
        long deletedRecords =
                activityRepository
                .countByActivityType("DELETE");


        // Return all statistics
        return new CustomerStatistics(
                totalCustomers,
                activeRecords,
                addedToday,
                deletedRecords
        );
     }
 // =========================
 // GET ACTIVITY HISTORY
 // =========================

 public List<CustomerActivity> getActivityHistory() {

     return activityRepository.findAllByOrderByActivityIdAsc();
 }
}
