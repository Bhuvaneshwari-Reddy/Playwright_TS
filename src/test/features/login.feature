Feature:User Login tests
  Background:
    Given User navigates to the application

  Scenario: User is on the Login Page
    Then  Verify the Logo, title, url, username, password fields, login button, login and password credentials on the login page
    Then Login as a standard user
    Then Then User should be on the Landing page and verify the logo and URL
    Then Verify the PRODUCTS title and peek image visible on the home page
    Then Verify all the options Burger menu item, ALL ITEMS; ABOUT; LOGOUT AND RESET APP STATE are visible on inventory sidebar links on left side of the page
    Then Verify the shopping cart icon and product sort container visible on the top right of the page
    Then Verify the Inventory Product item list is visible