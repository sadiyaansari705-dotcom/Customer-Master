package com.customermaster.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.customermaster.Customer;
import com.customermaster.CustomerActivity;
import com.customermaster.CustomerStatistics;
import com.customermaster.service.CustomerService;

@RestController
@CrossOrigin(origins = {
    "http://127.0.0.1:5501",
    "http://localhost:5501"
})
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService customerService;


    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }


    // =========================
    // GET ALL CUSTOMERS
    // =========================

    @GetMapping
    public List<Customer> getAllCustomers() {

        return customerService.getAllCustomers();
    }


    // =========================
    // GET CUSTOMER BY ID
    // =========================

    @GetMapping("/{id}")
    public Customer getCustomerById(
            @PathVariable("id") Long id) {

        return customerService.getCustomerById(id);
    }


    // =========================
    // GET STATISTICS
    // =========================

    @GetMapping("/statistics")
    public CustomerStatistics getStatistics() {

        return customerService.getStatistics();
    }


    // =========================
    // GET ACTIVITY HISTORY
    // =========================

    @GetMapping("/activity-history")
    public List<CustomerActivity> getActivityHistory() {

        return customerService.getActivityHistory();
    }


    // =========================
    // ADD CUSTOMER
    // =========================

    @PostMapping
    public Customer addCustomer(
            @RequestBody Customer customer) {

        return customerService.saveCustomer(customer);
    }


    // =========================
    // UPDATE CUSTOMER
    // =========================

    @PutMapping("/{id}")
    public Customer updateCustomer(
            @PathVariable("id") Long id,
            @RequestBody Customer customer) {

        customer.setId(id);

        return customerService.saveCustomer(customer);
    }


    // =========================
    // DELETE CUSTOMER
    // =========================

    @DeleteMapping("/{id}")
    public String deleteCustomer(
            @PathVariable("id") Long id) {

        customerService.deleteCustomer(id);

        return "Customer deleted successfully";
    }
}