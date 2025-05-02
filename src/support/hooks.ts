import {BeforeAll,AfterAll,Before,After} from "@cucumber/cucumber";
import {chromium,Browser,Page,BrowserContext} from "@playwright/test";
import {pageFixture} from "./pageFixture";
import {CustomWorld} from "./world";
import {LoginPageLocators} from "../page-objects/LoginPageLocators";
import {LoginPageActions} from "../page-objects/LoginPageActions";
import {InventoryPageLocators} from "../page-objects/InventoryPageLocators";
import {InventoryPageActions} from "../page-objects/InventoryPageActions";
import {invokeBrowser} from "../helper/Browsers/browserManager";


let page:Page;
let browser:Browser;
let context:BrowserContext;
BeforeAll({ timeout: 60 * 1000 },async function(){
    browser=await invokeBrowser();
})

Before(async function (this: CustomWorld) {
    context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page = page;

    // wire up your POMs now that `page` is valid
    this.page = page;
    this.loginLocators     = new LoginPageLocators(page);
    this.loginPage         = new LoginPageActions(this.loginLocators);
    this.inventoryLocators = new InventoryPageLocators(page);
    this.inventoryPage     = new InventoryPageActions(this.inventoryLocators);
});

After(async function({pickle}){
  const img=await  pageFixture.page.screenshot({path:`./reports/screenshots/${pickle.name}.png`,type:"png"});
  await  this.attach(img,"image/png");
  await pageFixture.page.close();
    await  context.close();
})

AfterAll(async function(){
    await pageFixture.page.close();
    await browser.close();
})


