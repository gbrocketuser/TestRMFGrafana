import { test } from '@playwright/test';
const { welcomepage } = require('../GrafanaPages/welcomePage');
const { adminpage } = require('../GrafanaPages/adminPage');
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

test.describe('IBM-RMF plugin', () => {
      test('disable IBM-RMF plugin', async ({ }) => {

        const welcome_Page = new welcomepage(page);
        const plugin_page = new adminpage(page);
        await welcome_Page.check_banner(test_data.banner_title);
        await welcome_Page.breadcrum_menu();
        await welcome_Page.apps_link_present();
        await welcome_Page.admin_page();

        await plugin_page.add_plugin(data_input.url[1]);
        await plugin_page.select_plugin(test_data.plugin_info);
        await plugin_page.plugin(test_data.plugin_disable);
        await plugin_page.home_breadcrum(test_data.breadcrum_home);
    });
  
    test('enable IBM-RMF plugin', async ({ }) => {

        const welcome_Page = new welcomepage(page);
        const plugin_page = new adminpage(page);
        await welcome_Page.check_title(test_data.title);
        await welcome_Page.check_banner(test_data.banner_title);
        await welcome_Page.breadcrum_menu();
        await welcome_Page.apps_link_hidden();
        await welcome_Page.admin_page();

        await plugin_page.add_plugin(data_input.url[1]);
        await plugin_page.select_plugin(test_data.plugin_info);
        await plugin_page.plugin(test_data.plugin_enable);
        await plugin_page.home_breadcrum(test_data.breadcrum_home);
    });
});