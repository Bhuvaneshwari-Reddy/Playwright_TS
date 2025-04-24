import {InventoryPageLocators} from './InventoryPageLocators';
export class InventoryPageActions {
    readonly locators: InventoryPageLocators;

    constructor(locators: InventoryPageLocators) {
        this.locators = locators;
    }

    async openMenu() {
        await this.locators.burgerMenu.click();
    }

    async sortBy(optionText: string) {
        await this.locators.sortDropdown.selectOption({ label: optionText });
    }


    async clickAbout() {
        await this.locators.aboutLink.click();
    }

    async clickSocialLink(platform: "Twitter" | "Facebook" | "LinkedIn") {
        switch (platform) {
            case "Twitter":
                await this.locators.twitterLink.click();
                break;
            case "Facebook":
                await this.locators.facebookLink.click();
                break;
            case "LinkedIn":
                await this.locators.linkedinLink.click();
                break;
        }
    }

    async logout() {
        await this.locators.burgerMenu.click();
        await this.locators.logoutLink.click();
    }
}
