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
    Then Select the Product sort container as Price low to high and verify the inventory item list is displayed correctly in the right order selected
    Then Verify the footer text and swag bot footer is visible
    Then Click on “About” navbar link from the “inventory sidebar panel” and check whether user is navigated to saucelabs page
    Then Verify the Twitter, Facebook, Linkedin logo visible
    Then Click on Twitter social link and verify user is navigated to Twitter page
    Then Click on Facebook social link and verify user is navigated to Facebook page
    Then Click on LinkedIn social link and verify user is navigated to LinkedIn page
    Then Click on Twitter,LinkedIn and Facebook social link and verify user is navigated to LinkedIn page
    Then User logout from the application and verify the login page
