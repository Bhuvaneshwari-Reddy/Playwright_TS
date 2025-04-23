import { Page } from '@playwright/test';

export class Navigate{

    readonly page:Page;

    constructor(page:Page) {
        this.page=page;

    }
    async  goToSauceDemo(){
        await this.page.goto("https://www.saucedemo.com/");
    }
}