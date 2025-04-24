import {Page,Locator} from "@playwright/test"

export  class InventoryPageLocators {
    readonly page:Page;
    readonly logo:Locator;
    readonly productsTitle:Locator;
    readonly peekImage: Locator;
    readonly burgerMenu: Locator;
    readonly allItemsLink: Locator;
    readonly aboutLink: Locator;
    readonly logoutLink: Locator;
    readonly resetAppLink: Locator;
    readonly shoppingCartIcon: Locator;
    readonly sortDropdown: Locator;
    readonly inventoryList: Locator;
    readonly inventoryItems: Locator;
    readonly inventoryItemPrice:Locator;
    readonly footerText: Locator;
    readonly saucePage:Locator;
    readonly twitterLink: Locator;
    readonly facebookLink: Locator;
    readonly linkedinLink: Locator;


    constructor(page:Page) {

        this.page=page;
        this.logo=page.locator("//div[@class='app_logo']");
        this.productsTitle=page.locator("//span[@class='title']");
        this.peekImage=page.locator("//img[@class='inventory_item_img']").nth(1);
        this.burgerMenu=page.locator("//button[@id='react-burger-menu-btn']");
        this.allItemsLink=page.locator("//a[@id='inventory_sidebar_link']");
        this.aboutLink=page.locator("//a[@id='about_sidebar_link']");
        this.logoutLink=page.locator("//a[@id='logout_sidebar_link']");
        this.resetAppLink=page.locator("//a[@id='reset_sidebar_link']");
        this.shoppingCartIcon=page.locator(".shopping_cart_link");
        this.sortDropdown=page.locator(".product_sort_container");
        this.inventoryList=page.locator(".inventory_item");
        this.inventoryItems=page.locator(".inventory_item_name");
        this.inventoryItemPrice=page.locator(".inventory_item_price");
        this.footerText=page.locator(".footer_copy");
        this.saucePage=page.locator("//div[@class='MuiBox-root css-lwb5go']//img[@alt='Saucelabs']");
        this.twitterLink=page.locator("a[href='https://twitter.com/saucelabs']");
        this.facebookLink=page.locator("a[href='https://www.facebook.com/saucelabs']");
        this.linkedinLink=page.locator("a[href='https://www.linkedin.com/company/sauce-labs/']");
}
}