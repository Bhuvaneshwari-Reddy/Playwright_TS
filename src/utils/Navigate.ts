import { Page } from '@playwright/test';
import {LOGIN_URL} from "./Constants";

export class Navigate{

    readonly page:Page;

    constructor(page:Page) {
        this.page=page;

    }
    async  goToSauceDemo(){
        await this.page.goto(LOGIN_URL);
    }
}