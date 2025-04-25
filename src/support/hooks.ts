import {BeforeAll,AfterAll,Before} from "@cucumber/cucumber";
import {chromium,Browser,Page} from "@playwright/test";
import {pageFixture} from "./pageFixture";
import {CustomWorld} from "./world";
import {LoginPageLocators} from "../page-objects/LoginPageLocators";
import {LoginPageActions} from "../page-objects/LoginPageActions";
import {InventoryPageLocators} from "../page-objects/InventoryPageLocators";
import {InventoryPageActions} from "../page-objects/InventoryPageActions";


let page:Page;
let browser:Browser;

BeforeAll({ timeout: 60 * 1000 },async function(){
    browser=await chromium.launch({headless:false});
    page=await browser.newPage();
    pageFixture.page=page;
})

AfterAll(async function(){
    await pageFixture.page.close();
    await browser.close();
})

Before(async function (this: CustomWorld) {
    const context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page = page;

    // wire up your POMs now that `page` is valid
    this.page = page;
    this.loginLocators     = new LoginPageLocators(page);
    this.loginPage         = new LoginPageActions(this.loginLocators);
    this.inventoryLocators = new InventoryPageLocators(page);
    this.inventoryPage     = new InventoryPageActions(this.inventoryLocators);
});

