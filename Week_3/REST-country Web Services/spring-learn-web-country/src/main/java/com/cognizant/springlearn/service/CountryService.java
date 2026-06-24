package com.cognizant.springlearn.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cognizant.springlearn.model.Country;

@Service
public class CountryService {

    public Country getCountry(String code) {

        List<Country> countries = Arrays.asList(
                new Country("IN", "India"),
                new Country("US", "United States"),
                new Country("GB", "United Kingdom")
        );

        return countries.stream()
                .filter(country -> country.getCode().equalsIgnoreCase(code))
                .findFirst()
                .orElse(null);
    }
}