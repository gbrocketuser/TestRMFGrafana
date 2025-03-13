import { test } from '@playwright/test';
const { welcomepage } = require('../GrafanaPages/welcomePage');
const { datasourcePage } = require('../GrafanaPages/datasourcePage');
const data_input = JSON.parse(JSON.stringify(require('../utils/credentials.json')));
const test_data = JSON.parse(JSON.stringify(require("../utils/testdata.json")));


let page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(data_input.url[0]);
});

// test.afterAll(async ({ }) => {
//     await page.locator(data_input.goto_logout).click();
//     await page.getByText(data_input.logout).waitFor();
//     await page.getByText(data_input.logout).click();
//     await page.close();
// })

test('Verify Apps Link And Create Datasource', async ({ }) => {
    const welcome_Page = new welcomepage(page);    
    await welcome_Page.check_title(test_data.title);
    await welcome_Page.check_banner(test_data.banner_title);
    await welcome_Page.breadcrum_menu();
    await welcome_Page.check_apps_link();
    await welcome_Page.apps_link_click();

    const datasource_Page = new datasourcePage(page);
    await datasource_Page.check_datasource_banner(test_data.datasource_title);
    await datasource_Page.check_datasource_plugin_manager(test_data.datasource_manager);
    await datasource_Page.add_rmf_datasource(test_data.add_datasource, test_data.datasource_header);
});

test('Delete Created Datasource', async ({ }) => {
    const welcome_Page = new welcomepage(page);   
    const datasource_Page = new datasourcePage(page); 
    await welcome_Page.breadcrum_menu();
    await welcome_Page.check_apps_link();
    await welcome_Page.expand_apps_link();
    await datasource_Page.check_datasource_plugin_manager(test_data.datasource_manager);
    await datasource_Page.delete_rmf_datasource();
});

test.only('Verify DataSource Basic Auth Success', async ({ }) => {
    const welcome_Page = new welcomepage(page);    
    await welcome_Page.breadcrum_menu();
    await welcome_Page.check_apps_link();
    await welcome_Page.apps_link_click();
    await page.pause();

    const datasource_Page = new datasourcePage(page);
    await datasource_Page.check_datasource_banner(test_data.datasource_title);
    await datasource_Page.check_datasource_plugin_manager(test_data.datasource_manager);
    await datasource_Page.add_rmf_datasource(test_data.add_datasource, test_data.datasource_header);
});