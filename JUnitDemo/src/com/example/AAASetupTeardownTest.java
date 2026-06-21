package com.example;

import static org.junit.Assert.assertEquals;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class AAASetupTeardownTest {

    private Calculator calculator;

    @Before
    public void setUp() {
        System.out.println("Setup executed");
        calculator = new Calculator();
    }

    @Test
    public void testAdd() {

        // Arrange
        int a = 10;
        int b = 5;

        // Act
        int result = calculator.add(a, b);

        // Assert
        assertEquals(15, result);
    }

    @After
    public void tearDown() {
        System.out.println("Teardown executed");
    }
}