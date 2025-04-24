import {Given,When,Then,setDefaultTimeout} from "@cucumber/cucumber";
import {expect} from "@playwright/test";
import {pageFixture} from "../support/pageFixture";
import {Navigate} from "../utils/Navigate";

setDefaultTimeout(10 * 1000);

Given("User navigates to the application", async function () {
    const navigator = new Navigate(pageFixture.page);
    await navigator.goToSauceDemo(); // you can also use `goToUrl("https://www.saucedemo.com/")`
});

Then("Verify the Logo, title, url, username, password fields, login button, login and password credentials on the login page",async function(){
    //assertions
    await expect(this.loginLocators.logo).toBeVisible();
    await expect(pageFixture.page).toHaveURL("https://www.saucedemo.com/");
    await expect(pageFixture.page).toHaveTitle("Swag Labs");
    await expect(this.loginLocators.usernameInput).toBeVisible();
    await expect(this.loginLocators.passwordInput).toBeVisible();
    await expect(this.loginLocators.loginButton).toBeVisible();

    //valid login
    await this.loginPage.login("standard_user", "secret_sauce");
    await expect(pageFixture.page).toHaveURL("https://www.saucedemo.com/inventory.html");

    //Back and Invalid Login
    await pageFixture.page.goBack();
    await this.loginPage.login("wrong_user","wrong_password");
    await expect(this.loginLocators.errorMsg).toBeVisible();
    await expect(this.loginLocators.errorMsg).toHaveText("Epic sadface: Username and password do not match any user in this service");
})

Then("Login as a standard user",async function(){
    await this.loginPage.login("standard_user", "secret_sauce");
    await expect(pageFixture.page).toHaveURL("https://www.saucedemo.com/inventory.html");
})

Then("Then User should be on the Landing page and verify the logo and URL",async function(){
    await expect(this.inventoryLocators.logo).toBeVisible();
    await expect(pageFixture.page).toHaveURL("https://www.saucedemo.com/inventory.html");
})

Then("Verify the PRODUCTS title and peek image visible on the home page",async function(){
    await expect(this.inventoryLocators.productsTitle).toBeVisible();
    await expect(this.inventoryLocators.productsTitle).toHaveText("Products");
    await expect(this.inventoryLocators.peekImage).toBeVisible();
})

Then("Verify all the options Burger menu item, ALL ITEMS; ABOUT; LOGOUT AND RESET APP STATE are visible on inventory sidebar links on left side of the page",async function(){
    await this.inventoryPage.openMenu();
    await expect(this.inventoryLocators.allItemsLink).toBeVisible();
    await expect(this.inventoryLocators.aboutLink).toBeVisible();
    await expect(this.inventoryLocators.logoutLink).toBeVisible();
    await expect(this.inventoryLocators.resetAppLink).toBeVisible()
    await expect(this.inventoryLocators.allItemsLink).toHaveText("All Items");
    await expect(this.inventoryLocators.aboutLink).toHaveText("About");
    await expect(this.inventoryLocators.logoutLink).toHaveText("Logout");
    await expect(this.inventoryLocators.resetAppLink).toHaveText("Reset App State");
})

Then("Verify the shopping cart icon and product sort container visible on the top right of the page",async function(){
    await expect(this.inventoryLocators.shoppingCartIcon).toBeVisible();
    await expect(this.inventoryLocators.sortDropdown).toBeVisible();
    const options = await this.inventoryLocators.sortDropdown.locator('option').allTextContents();
    const expectedOptions=[
        "Name (A to Z)",
        "Name (Z to A)",
        "Price (low to high)",
        "Price (high to low)"
    ];
    expect(options).toEqual(expectedOptions);
})

Then("Verify the Inventory Product item list is visible",async function(){
    const products = await this.inventoryLocators.inventoryList.allTextContents();
    console.log("All Product Items:", products);
    expect(products.length).toEqual(6);
    const productNames=await this.inventoryLocators.inventoryItems.allTextContents();
    console.log("All Product Items:", productNames);
})

Then("Select the Product sort container as Price (low to high) and verify the inventory item list is displayed correctly in the right order selected",async function(){
    await this.inventoryPage.sortBy("Price (low to high)");
    await expect (this.inventoryLocators.sortDropdown.first()).toBeVisible();
    const prices=  await this.inventoryLocators.inventoryItemPrice.allTextContents();
    const priceValues=prices.map((price: string)=>parseFloat(price.replace('$','').trim()));
    const sortedPriceValues = [...priceValues];
    sortedPriceValues.sort((a, b) => a- b);
    expect(priceValues).toEqual(sortedPriceValues);
})

Then("Verify the footer text and swag bot footer is visible",async function(){
    await expect(this.inventoryLocators.footerText).toBeVisible();
    await expect(this.inventoryLocators.footerText).toHaveText("© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
    await expect(this.inventoryLocators.footerText).toContainText("Sauce Labs. All Rights Reserved.");
})

Then("Click on “About” navbar link from the “inventory sidebar panel” and check whether user is navigated to saucelabs page",async  function(){
    await this.inventoryPage.clickAbout();
    await expect(pageFixture.page).toHaveURL("https://saucelabs.com/");
    await  expect(this.inventoryLocators.saucePage).toBeVisible();
    await pageFixture.page.goBack();
})

Then("Verify the Twitter, Facebook, Linkedin logo visible",async function(){
    await expect(this.inventoryLocators.twitterLink).toBeVisible();
    await expect(this.inventoryLocators.facebookLink).toBeVisible();
    await expect(this.inventoryLocators.linkedinLink).toBeVisible();


})

Then("Click on Twitter social link and verify user is navigated to Twitter page", { timeout: 10 * 1000 }, async function () {
    const [newPage]=await Promise.all([
        pageFixture.page.context().waitForEvent("page"),
        this.inventoryLocators.twitterLink.click()
    ])
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain("https://x.com/saucelabs")
    await newPage.close();
});

Then("Click on Facebook social link and verify user is navigated to Facebook page", async function () {
    const [newPage] = await Promise.all([
        pageFixture.page.context().waitForEvent("page"),
        this.inventoryLocators.facebookLink.click()
    ]);
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain("https://www.facebook.com/saucelabs");
    await newPage.close();
});

Then("Click on LinkedIn social link and verify user is navigated to LinkedIn page", async function () {
    const [newPage] = await Promise.all([
        pageFixture.page.context().waitForEvent("page"),
        this.inventoryLocators.linkedinLink.click()
    ]);
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain("https://www.linkedin.com/company/sauce-labs/");
    await newPage.close();
});

Then ("Click on Twitter,LinkedIn and Facebook social link and verify user is navigated to LinkedIn page", async function (){
    const socialLinks = [
        { name: "Twitter", expectedUrl: "https://x.com/saucelabs" },
        { name: "Facebook", expectedUrl: "https://www.facebook.com/saucelabs" },
        { name: "LinkedIn", expectedUrl: "https://www.linkedin.com/company/sauce-labs/" }
    ];

    for (const link of socialLinks) {
        const [newPage] = await Promise.all([
            pageFixture.page.context().waitForEvent("page"),
            this.inventoryPage.clickSocialLink(link.name as "Twitter" | "Facebook" | "LinkedIn")
        ]);
        await newPage.waitForLoadState();
        const currentUrl = newPage.url();
        expect(currentUrl).toContain(link.expectedUrl);
        await newPage.close();
    }
})

Then("User logout from the application and verify the login page",async function(){
    await  this.inventoryPage.logout();
})
