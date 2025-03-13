const { expect } = require('@playwright/test');
const { adminpage } = require('../GrafanaPages/adminPage');
const data_input = JSON.parse(JSON.stringify(require('../utils/credentials.json')));
const test_data = JSON.parse(JSON.stringify(require("../utils/testdata.json")));


class welcomepage {
    constructor(page) {
        this.page = page;
        this.banner = this.page.locator(".css-17tm80");
        this.menu = this.page.locator(".css-1opalb8");
        this.apps_link = this.page.locator("[href='/apps']");
        this.admin_link = this.page.locator("[href='/admin']");
        this.ibm_rmf = this.page.locator("[href='/a/ibm-rmf/']")
    }

    async check_title(title) {
        await expect(this.page).toHaveTitle(title);

    }

    async check_banner(banner_title) {
        await expect(this.banner).toContainText(banner_title);
    }

    async breadcrum_menu() {
        await this.page.waitForLoadState('networkidle');
        await this.menu.click();
    }

    async apps_link_hidden() {
        const apps = await this.apps_link.isHidden();
        expect(apps).toBeTruthy();
    }

    async apps_link_present() {
        const apps = await this.apps_link.isHidden();
        expect(apps).toBeFalsy();
    }

    async apps_link_click() {
        await this.apps_link.click();
    }

    async admin_page() {
        await this.admin_link.click();

    }

    async check_apps_link() {
        if (await this.apps_link.isHidden() === true) {
            const plugin_page = new adminpage(this.page);
            await this.admin_page();
            await plugin_page.add_plugin(data_input.url[1]);
            await plugin_page.select_plugin(test_data.plugin_info);
            await plugin_page.plugin(test_data.plugin_enable);
            await plugin_page.home_breadcrum(test_data.breadcrum_home);
            await this.breadcrum_menu();
        }
    }

    async expand_apps_link() {
        await this.page.getByRole('button', { name: 'Expand section Apps' }).click();
        await this.ibm_rmf.click();

    }
}
module.exports = { welcomepage }