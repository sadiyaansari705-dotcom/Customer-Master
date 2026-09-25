package com.customermaster.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.customermaster.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findAllByOrderByIdAsc();

}