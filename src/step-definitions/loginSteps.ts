// import {Given,When,Then,setDefaultTimeout} from "@cucumber/cucumber";
// import {expect} from "@playwright/test";
// import {pageFixture} from "../../hooks/pageFixture";
// import { LoginPageLocators} from "../PageObjects/LoginPageLocators";
// import { LoginPageActions} from "../PageObjects/LoginPageActions";
// import {Navigate} from "../../utils/Navigate";
// import {InventoryPageLocators} from "../PageObjects/InventoryPageLocators";
// import {InventoryPageActions} from "../PageObjects/InventoryPageActions ";
//
// setDefaultTimeout(10 * 1000);
//
// Given("User navigates to the application", async function () {
//     const navigator = new Navigate(pageFixture.page);
//     await navigator.goToSauceDemo(); // you can also use `goToUrl("https://www.saucedemo.com/")`
// });
//
// Then("Verify the Logo, title, url, username, password fields, login button, login and password credentials on the login page",async function(){
//    const locators=new LoginPageLocators(pageFixture.page);
//    const actions=new  LoginPageActions(locators);
//
//    //assertions
//     await expect(locators.logo).toBeVisible();
//     await expect(pageFixture.page).toHaveURL("https://www.saucedemo.com/");
//     await expect(pageFixture.page).toHaveTitle("Swag Labs");
//     await expect(locators.usernameInput).toBeVisible();
//     await expect(locators.passwordInput).toBeVisible();
//     await expect(locators.loginButton).toBeVisible();
//
//     //valid login
//     await actions.login("standard_user", "secret_sauce");
//     await expect(pageFixture.page).toHaveURL("https://www.saucedemo.com/inventory.html");
//
//     //Back and Invalid Login
//     await pageFixture.page.goBack();
//     await actions.login("wrong_user","wrong_password");
//     await expect(locators.errorMsg).toBeVisible();
//     await expect(locators.errorMsg).toHaveText("Epic sadface: Username and password do not match any user in this service");
//
// })
//
// Then("Login as a standard user",async function(){
//     const locators=new LoginPageLocators(pageFixture.page);
//     const actions=new  LoginPageActions(locators);
//     await actions.login("standard_user", "secret_sauce");
//     await expect(pageFixture.page).toHaveURL("https://www.saucedemo.com/inventory.html");
// })
//
// Then("Then User should be on the Landing page and verify the logo and URL",async function(){
//     const locators=new InventoryPageLocators(pageFixture.page)
//     await expect(locators.logo).toBeVisible();
//     await expect(pageFixture.page).toHaveURL("https://www.saucedemo.com/inventory.html");
//
// })
//
// Then("Verify the PRODUCTS title and peek image visible on the home page",async function(){
//      const  locators=new InventoryPageLocators(pageFixture.page);
//      await expect(locators.productsTitle).toBeVisible();
//      await expect(locators.productsTitle).toHaveText("Products");
//      await expect(locators.peekImage).toBeVisible();
// })
//
// Then("Verify all the options Burger menu item, ALL ITEMS; ABOUT; LOGOUT AND RESET APP STATE are visible on inventory sidebar links on left side of the page",async function(){
//     const locators=new InventoryPageLocators(pageFixture.page);
//     const actions=new InventoryPageActions(locators);
//     await actions.openMenu();
//     await expect(locators.allItemsLink).toBeVisible();
//     await expect(locators.aboutLink).toBeVisible();
//     await expect(locators.logoutLink).toBeVisible();
//     await expect(locators.resetAppLink).toBeVisible()
//     await expect(locators.allItemsLink).toHaveText("All Items");
//     await expect(locators.aboutLink).toHaveText("About");
//     await expect(locators.logoutLink).toHaveText("Logout");
//     await expect(locators.resetAppLink).toHaveText("Reset App State");
// })
//
// Then("Verify the shopping cart icon and product sort container visible on the top right of the page",async function(){
//      const locators=new InventoryPageLocators(pageFixture.page);
//      await expect(locators.shoppingCartIcon).toBeVisible();
//      await expect(locators.sortDropdown).toBeVisible();
//      const options = await locators.sortDropdown.locator('option').allTextContents();
//      const expectedOptions=[
//          "Name (A to Z)",
//          "Name (Z to A)",
//          "Price (low to high)",
//          "Price (high to low)"
//      ];
//       expect(options).toEqual(expectedOptions);
//  })
//
// Then("Verify the Inventory Product item list is visible",async function(){
//     const locators=new InventoryPageLocators(pageFixture.page);
//     const products = await locators.inventoryList.allTextContents();
//     console.log("All Product Items:", products);
//     expect(products.length).toEqual(6);
//     const productNames=await locators.inventoryItems.allTextContents();
//     console.log("All Product Items:", productNames);
// })
//
// Then("Select the Product sort container as Price (low to high) and verify the inventory item list is displayed correctly in the right order selected",async function(){
//     const locators=new InventoryPageLocators(pageFixture.page);
//     const actions=new InventoryPageActions(locators);
//     await actions.sortBy("Price (low to high)");
//     await expect (locators.sortDropdown.first()).toBeVisible();
//     const prices=  await locators.inventoryItemPrice.allTextContents();
//     console.log(prices)
//     const priceValues=prices.map((price: string)=>parseFloat(price.replace('$','').trim()));
//     console.log(priceValues);
//     const sortedPriceValues = [...priceValues];
//     sortedPriceValues.sort((a, b) => a- b);
//     expect(priceValues).toEqual(sortedPriceValues);
// })
//
// Then("Verify the footer text and swag bot footer is visible",async function(){
//      const locators=new InventoryPageLocators(pageFixture.page);
//      await expect(locators.footerText).toBeVisible();
//      await expect(locators.footerText).toHaveText("© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
//      await expect(locators.footerText).toContainText("Sauce Labs. All Rights Reserved.");
// })
//
// Then("Click on “About” navbar link from the “inventory sidebar panel” and check whether user is navigated to saucelabs page",async  function(){
//     const locators=new InventoryPageLocators(pageFixture.page);
//     const actions=new InventoryPageActions(locators);
//     await actions.clickAbout();
//     await expect(pageFixture.page).toHaveURL("https://saucelabs.com/");
//     await  expect(locators.saucePage).toBeVisible();
//     await pageFixture.page.goBack();
// })
//
// Then("Verify the Twitter, Facebook, Linkedin logo visible",async function(){
//     const locators = new InventoryPageLocators(pageFixture.page);
//
//     await expect(locators.twitterLink).toBeVisible();
//     await expect(locators.facebookLink).toBeVisible();
//     await expect(locators.linkedinLink).toBeVisible();
//
//
// })
//
// Then("Click on Twitter social link and verify user is navigated to Twitter page", { timeout: 10 * 1000 }, async function () {
//     const locators = new InventoryPageLocators(pageFixture.page);
//
//     const [newPage]=await Promise.all([
//         pageFixture.page.context().waitForEvent("page"),
//         locators.twitterLink.click()
//     ])
//     await newPage.waitForLoadState();
//     expect(newPage.url()).toContain("https://x.com/saucelabs")
//     await newPage.close();
// });
//
// Then("Click on Facebook social link and verify user is navigated to Facebook page", async function () {
//     const locators = new InventoryPageLocators(pageFixture.page);
//     const [newPage] = await Promise.all([
//         pageFixture.page.context().waitForEvent("page"),
//         locators.facebookLink.click()
//     ]);
//     await newPage.waitForLoadState();
//     expect(newPage.url()).toContain("https://www.facebook.com/saucelabs");
//     await newPage.close();
// });
//
// Then("Click on LinkedIn social link and verify user is navigated to LinkedIn page", async function () {
//     const locators = new InventoryPageLocators(pageFixture.page);
//     const [newPage] = await Promise.all([
//         pageFixture.page.context().waitForEvent("page"),
//         locators.linkedinLink.click()
//     ]);
//     await newPage.waitForLoadState();
//     expect(newPage.url()).toContain("https://www.linkedin.com/company/sauce-labs/");
//     await newPage.close();
// });
//
// Then ("Click on Twitter,LinkedIn and Facebook social link and verify user is navigated to LinkedIn page", async function (){
//     const locators = new InventoryPageLocators(pageFixture.page);
//     const actions = new InventoryPageActions(locators);
//     const socialLinks = [
//         { name: "Twitter", expectedUrl: "https://x.com/saucelabs" },
//         { name: "Facebook", expectedUrl: "https://www.facebook.com/saucelabs" },
//         { name: "LinkedIn", expectedUrl: "https://www.linkedin.com/company/sauce-labs/" }
//     ];
//
//     for (const link of socialLinks) {
//         const [newPage] = await Promise.all([
//             pageFixture.page.context().waitForEvent("page"),
//             actions.clickSocialLink(link.name as "Twitter" | "Facebook" | "LinkedIn")
//         ]);
//         await newPage.waitForLoadState();
//         const currentUrl = newPage.url();
//         expect(currentUrl).toContain(link.expectedUrl);
//         await newPage.close();
//     }
// })
// Then("User logout from the application and verify the login page",async function(){
//     const locators = new InventoryPageLocators(pageFixture.page);
//     const actions = new InventoryPageActions(locators);
//     await  actions.logout();
// })
