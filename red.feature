Feature: Search and select rides Functionality

        Background:
            Given user is on homepage

        Scenario: Select bus seat given details
             When user enters Source and Destination
              And selects a date from calendar
              And selects to view seats on the bus
              And selects a certain seat
             Then Proceeds to Payment