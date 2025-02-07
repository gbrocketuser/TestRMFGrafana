const { test, expect } = require('@playwright/test');


class adminpage {
    constructor(page) {
        this.page = page;
        this.plugin_link = this.page.locator("[aria-label='Tab Plugins']");
        this.plugin_admin_link = this.page.locator("[href='/admin/plugins']");
        this.plugin_link_new = this.page.locator("[href='/plugins']");
        this.search_plugin = this.page.getByPlaceholder("Search Grafana plugins");
        this.click_plugin = this.page.locator("[href='/plugins/ibm-rmf']");

    }

    async add_plugin(version) {
        if (version === "v11") {
            await this.plugin_admin_link.click();
            await this.plugin_link_new.click();
        }
        else {
            await this.plugin_link.click();
        }

    }
    async select_plugin(plugin_info) {
        await this.search_plugin.fill(plugin_info);
        await this.click_plugin.first().waitFor();
        await this.click_plugin.click();
    }


    async plugin(option) {
        await this.page.getByRole("button", { name: option }).first().click();
    }

    async home_breadcrum(goto) {
        await this.page.reload();
        await this.page.getByText(goto).waitFor();
        await this.page.getByText(goto).click();
    }

}
module.exports = { adminpage }