package com.cognizant.ormlearn.repository;

import org.springframework.stereotype.Repository;

@Repository
public class CountryRepository {

    public void findAllCountries() {

        System.out.println("Country 1 : India");
        System.out.println("Country 2 : United States of America");

    }
}