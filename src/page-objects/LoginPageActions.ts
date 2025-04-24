import {LoginPageLocators} from './LoginPageLocators';
import {pageFixture} from "../support/pageFixture";

export  class LoginPageActions{
    readonly  locators:LoginPageLocators;

    constructor(locators:LoginPageLocators ) {
        this.locators=locators;
    }


    async fillUserName(username:string){
        await this.locators.usernameInput.fill(username);
    }
    async fillPassword(password:string){
        await this.locators.passwordInput.fill(password)
    }

    async clickLogin(){
        await this.locators.loginButton.click()
    }

    async login(username:string,password:string){
        await this.fillUserName(username);
        await this.fillPassword(password);
        await this.clickLogin();
    }
}