import { test } from '@playwright/test';
const { welcomepage } = require('../GrafanaPages/welcomePage');
const { datasourcePage } = require('../GrafanaPages/datasourcePage');
const data_input = JSON.parse(JSON.stringify(require('../utils/credentials.json')));
const test_data = JSON.parse(JSON.stringify(require("../utils/testdata.json")));


let page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(data_input.url[0])
});

// test.afterAll(async ({ }) => {
//     await page.locator(data_input.goto_logout).click();
//     await page.getByText(data_input.logout).waitFor();
//     await page.getByText(data_input.logout).click();
//     await page.close();
// })

test('Verify Apps link and create datasource', async ({ }) => {
    const welcome_Page = new welcomepage(page);
    await welcome_Page.check_title(test_data.title);
    await welcome_Page.check_banner(test_data.banner_title);
    await welcome_Page.breadcrum_menu();
    await welcome_Page.check_apps_link();
    await welcome_Page.apps_link_click();

});