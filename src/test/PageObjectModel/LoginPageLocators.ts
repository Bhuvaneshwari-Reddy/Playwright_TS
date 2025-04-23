import {Page,Locator} from "@playwright/test"

export  class LoginPageLocators{
    readonly  page:Page;
    readonly  logo:Locator;
    readonly  usernameInput:Locator;
    readonly passwordInput:Locator;
    readonly  loginButton:Locator;
    readonly  errorMsg:Locator;


    constructor(page:Page) {
        this.page = page;
        this.logo = page.locator("//div[@class='login_logo']");
        this.usernameInput = page.getByPlaceholder("Username");
        this.passwordInput = page.getByPlaceholder("Password");
        this.loginButton = page.locator("//input[@id='login-button']");
        this.errorMsg = page.locator("//h3[@data-test='error']");
    }

}
