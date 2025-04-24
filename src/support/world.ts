import { setWorldConstructor,Before } from "@cucumber/cucumber";
import { pageFixture } from "./pageFixture";
import {LoginPageActions} from "../page-objects/LoginPageActions";
import {InventoryPageActions} from "../page-objects/InventoryPageActions";
import {LoginPageLocators} from "../page-objects/LoginPageLocators";
import {InventoryPageLocators} from "../page-objects/InventoryPageLocators"; // adjust if needed



export class CustomWorld {
    page = pageFixture.page;

    loginLocators!: LoginPageLocators;
    loginPage!: LoginPageActions;

    inventoryLocators!: InventoryPageLocators;
    inventoryPage!: InventoryPageActions;


}

setWorldConstructor(CustomWorld);
