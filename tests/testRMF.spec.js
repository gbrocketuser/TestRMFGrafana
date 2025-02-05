const { test } = require('@playwright/test');
const { welcomepage } = require('../GrafanaPages/welcomePage');
const { adminpage } = require('../GrafanaPages/adminPage');
// const data_input = JSON.parse(JSON.stringify(require('../utils/credentials.json')));
// const test_data =JSON.parse(JSON.stringify(require("../utils/testdata.json")));

const data_input = 
{
    url: "https://lnxrrmf2:3010/login",
    version : "v10",
    user_name: "admin",
    user_pwd: "admin",
    user_submit : "[type='submit']",
    pwd_skip : "Skip",
    goto_logout: "[alt='User avatar']",
    logout : "Sign out"
};

const test_data = {
    "title": "Grafana",
    "banner_title": "Welcome to Grafana",
    "plugin_info": "IBM RMF",
    "breadcrum_home": "Home",
    "plugin_enable": "Enable",
    "plugin_disable": "Disable"
};

let page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(data_input.url);
    await page.locator("[name='user']").fill(data_input.user_name);
    await page.locator("[name='password']").fill(data_input.user_pwd);
    await page.locator(data_input.user_submit).click();
    await page.getByText(data_input.pwd_skip).click();
})

test.afterAll(async ({ }) => {
    await page.locator(data_input.goto_logout).click();
    await page.getByText(data_input.logout).waitFor();
    await page.getByText(data_input.logout).click();
    await page.close();
})

test('enable IBM-RMF plugin', async () => {
    
    const welcome_Page = new welcomepage(page);
    const plugin_page = new adminpage(page);
    await welcome_Page.check_title(test_data.title);
    await welcome_Page.check_banner(test_data.banner_title);
    await welcome_Page.breadcrum_menu();
    await welcome_Page.apps_link_hidden();
    await welcome_Page.admin_page();

    await plugin_page.add_plugin(data_input.version);
    await plugin_page.select_plugin(test_data.plugin_info);
    await plugin_page.plugin(test_data.plugin_enable, test_data.breadcrum_home);
});


test('disable IBM-RMF plugin', async () => {
  
    const welcome_Page = new welcomepage(page);
    const plugin_page = new adminpage(page);
    await welcome_Page.check_banner(test_data.banner_title);
    await welcome_Page.breadcrum_menu();
    await welcome_Page.apps_link_present();
    await welcome_Page.admin_page();

    await plugin_page.add_plugin(data_input.version);
    await plugin_page.select_plugin(test_data.plugin_info);
    await plugin_page.plugin(test_data.plugin_disable, test_data.breadcrum_home);
});