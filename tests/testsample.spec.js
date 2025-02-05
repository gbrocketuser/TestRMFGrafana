import { test, expect } from '@playwright/test';


test('sample check', async ({page}) => {
    await page.goto("https://www.google.co.uk/");
    await page.goto("https://lnxrrmf2:3010/login");   
});