Here are comprehensive, revision-style notes for **Playwright with BDD Cucumber framework using TypeScript**. These notes are designed for quick revision and structured by topic.

---

# 🎭 **Playwright with BDD Cucumber in TypeScript – Revision Notes**

---

## 📦 **Project Setup**

### 🔧 Required Dependencies
```bash
npm init -y
npm install playwright @cucumber/cucumber ts-node typescript @types/node --save-dev
npm install @cucumber/pretty-formatter --save-dev
```

### 📁 Folder Structure (Recommended)
```
/tests
  └── features/
       └── sample.feature
  └── steps/
       └── stepDefinitions.ts
  └── support/
       └── hooks.ts
       └── customWorld.ts
/playwright.config.ts
/tsconfig.json
/cucumber.js
```

---

## ⚙️ **Configuration Files**

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "esModuleInterop": true,
    "types": ["node", "playwright"]
  },
  "include": ["tests/**/*.ts"]
}
```

### `cucumber.js`
```js
module.exports = {
  default: `--require-module ts-node/register 
            --require tests/steps/**/*.ts 
            --require tests/support/**/*.ts 
            --format @cucumber/pretty-formatter`
};
```

---

## 🧪 **Writing Feature Files**

### 📄 `sample.feature`
```gherkin
Feature: Login Functionality

  Scenario: Successful login
    Given I open the application
    When I login with valid credentials
    Then I should see the dashboard
```

---

## 🧾 **Step Definitions**

### `stepDefinitions.ts`
```ts
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I open the application', async function () {
  await this.page.goto('https://example.com');
});

When('I login with valid credentials', async function () {
  await this.page.fill('#username', 'user');
  await this.page.fill('#password', 'pass');
  await this.page.click('#login');
});

Then('I should see the dashboard', async function () {
  await expect(this.page.locator('text=Dashboard')).toBeVisible();
});
```

---

## 🌍 **Custom World**

### `customWorld.ts`
```ts
import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;

  async launchBrowser() {
    this.browser = await chromium.launch({ headless: true });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
```

---

## 🔁 **Hooks**

### `hooks.ts`
```ts
import { Before, After } from '@cucumber/cucumber';

Before(async function () {
  await this.launchBrowser();
});

After(async function () {
  await this.closeBrowser();
});
```

---

## 🧰 **Playwright Essentials**

| Feature | Syntax |
|--------|--------|
| Launch Browser | `const browser = await chromium.launch()` |
| New Page | `const page = await browser.newPage()` |
| Go to URL | `await page.goto('https://')` |
| Click | `await page.click('selector')` |
| Fill Input | `await page.fill('selector', 'value')` |
| Get Text | `await page.textContent('selector')` |
| Assertion | `expect(await page.isVisible('selector')).toBeTruthy()` |

---

## 📂 **Advanced Playwright Topics**

- **Selectors**: `text=`, `css=`, `xpath=`, `role=`, `nth=`
- **Assertions**: `toBeVisible`, `toHaveText`, `toContainText`, `toBeEnabled`
- **Screenshots**: `await page.screenshot({ path: 'screenshot.png' })`
- **Handling Alerts**: `page.on('dialog', async dialog => { await dialog.accept(); })`
- **Frames**: `const frame = page.frame({ name: 'frame-name' })`
- **Multiple Tabs**: `context.newPage()` creates a new tab
- **Downloads**: `page.waitForEvent('download')`

---

## 🎯 **Best Practices**

- Use **custom World** to share context across steps.
- Keep **selectors and locators** centralized.
- Use **hooks** for clean browser setup/teardown.
- Avoid hard waits, use `await page.waitForSelector(...)`.
- Follow **Gherkin syntax**: clear, concise, non-technical.
- Use Page Object Model for complex projects.

---

## ✅ **Test Execution**

### Run all tests:
```bash
npx cucumber-js
```

### Run with tag:
```bash
npx cucumber-js --tags @smoke
```

---

## 🏷️ **Tagging Scenarios**
```gherkin
@smoke @login
Scenario: Successful login
  Given ...
```

---

Would you like these notes as a downloadable PDF or markdown file too? Let me know if you want a deeper dive into **Page Object Model**, **parallel execution**, or **report generation** (like Allure or HTML Reporter).