import {BeforeAll,AfterAll} from "@cucumber/cucumber";
import {chromium,Browser,Page} from "@playwright/test";
import {pageFixture} from "./pageFixture";

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