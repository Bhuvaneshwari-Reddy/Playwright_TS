import {Given,When,Then,setDefaultTimeout} from "@cucumber/cucumber";
import {expect} from "@playwright/test";
import {pageFixture} from "../../hooks/pageFixture";
import { LoginPageLocators} from "../PageObjectModel/LoginPageLocators";
import { LoginPageActions} from "../PageObjectModel/LoginPageActions";
import {Navigate} from "../../utils/Navigate";
import {InventoryPageLocators} from "../PageObjectModel/InventoryPageLocators";
import {InventoryPageActions} from "../PageObjectModel/InventoryPageActions ";

// setDefaultTimeout(60 * 2000);

Given("User navigates to the application", async function () {
    const navigator = new Navigate(pageFixture.page);
    await navigator.goToSauceDemo(); // you can also use `goToUrl("https://www.saucedemo.com/")`
});

Then("Verify the Logo, title, url, username, password fields, login button, login and password credentials on the login page",async function(){
   const locators=new LoginPageLocators(pageFixture.page);
   const actions=new  LoginPageActions(locators);

   //assertions
    await expect(locators.logo).toBeVisible();
    await expect(pageFixture.page).toHaveURL("https://www.saucedemo.com/");
    await expect(pageFixture.page).toHaveTitle("Swag Labs");
    await expect(locators.usernameInput).toBeVisible();
    await expect(locators.passwordInput).toBeVisible();
    await expect(locators.loginButton).toBeVisible();

    //valid login
    await actions.login("standard_user", "secret_sauce");
    await expect(pageFixture.page).toHaveURL("https://www.saucedemo.com/inventory.html");

    //Back and Invalid Login
    await pageFixture.page.goBack();
    await actions.login("wrong_user","wrong_password");
    await expect(locators.errorMsg).toBeVisible();
    await expect(locators.errorMsg).toHaveText("Epic sadface: Username and password do not match any user in this service");

})

Then("Login as a standard user",async function(){
    const locators=new LoginPageLocators(pageFixture.page);
    const actions=new  LoginPageActions(locators);
    await actions.login("standard_user", "secret_sauce");
    await expect(pageFixture.page).toHaveURL("https://www.saucedemo.com/inventory.html");
})

Then("Then User should be on the Landing page and verify the logo and URL",async function(){
    const locators=new InventoryPageLocators(pageFixture.page)
    await expect(locators.logo).toBeVisible();
    await expect(pageFixture.page).toHaveURL("https://www.saucedemo.com/inventory.html");

})

Then("Verify the PRODUCTS title and peek image visible on the home page",async function(){
     const  locators=new InventoryPageLocators(pageFixture.page);
     await expect(locators.productsTitle).toBeVisible();
     await expect(locators.productsTitle).toHaveText("Products");
     await expect(locators.peekImage).toBeVisible();
})

Then("Verify all the options Burger menu item, ALL ITEMS; ABOUT; LOGOUT AND RESET APP STATE are visible on inventory sidebar links on left side of the page",async function(){
    const locators=new InventoryPageLocators(pageFixture.page);
    const actions=new InventoryPageActions(locators);
    await actions.openMenu();
    await expect(locators.allItemsLink).toBeVisible();
    await expect(locators.aboutLink).toBeVisible();
    await expect(locators.logoutLink).toBeVisible();
    await expect(locators.resetAppLink).toBeVisible()
    await expect(locators.allItemsLink).toHaveText("All Items");
    await expect(locators.aboutLink).toHaveText("About");
    await expect(locators.logoutLink).toHaveText("Logout");
    await expect(locators.resetAppLink).toHaveText("Reset App State");
})
 Then("Verify the shopping cart icon and product sort container visible on the top right of the page",async function(){
     const locators=new InventoryPageLocators(pageFixture.page);
     const actions=new InventoryPageActions(locators);
     await expect(locators.shoppingCartIcon).toBeVisible();


     await expect(locators.sortDropdown).toBeVisible();
     await  actions.sortBy();
     const options = await locators.sortDropdown.locator('option').allTextContents();
     const expectedOptions=[
         "Name (A to Z)",
         "Name (Z to A)",
         "Price (low to high)",
         "Price (high to low)"
     ];
      expect(options).toEqual(expectedOptions);
 })

Then("Verify the Inventory Product item list is visible",async function(){
    const locators=new InventoryPageLocators(pageFixture.page);
    const products = await locators.inventoryList.allTextContents();
    console.log("All Product Items:", products);
    expect(products.length).toEqual(6);
    const productNames=await locators.inventoryItems.allTextContents();
    console.log("All Product Items:", productNames);

})
