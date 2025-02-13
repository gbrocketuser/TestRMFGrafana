import { chromium, expect } from '@playwright/test';
const data_input = JSON.parse(JSON.stringify(require('../GrafanaTest/utils/credentials.json')));

async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        ignoreHTTPSErrors: true,  // This ignores SSL certificate errors
        });
    const page = await context.newPage();
    await page.goto(data_input.url[0]);
    await page.locator("[name='user']").fill("xxxx");
    await page.locator("[name='password']").fill("xxxx");
    await page.locator("[type='submit']").click();
    await page.getByText("Skip").click();
    await page.context().storageState({ path: "./LoginAuth.json" });
};

export default globalSetup;