const { test, expect } = require('@playwright/test');


class welcomepage {
    constructor(page) {
        this.page = page;
        this.banner = this.page.locator(".css-17tm80");
        this.menu = this.page.locator(".css-1opalb8");
        this.apps_link = this.page.locator("[href='/apps']");
        this.admin_link = this.page.locator("[href='/admin']");
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

    async admin_page() {
        await this.admin_link.click();
       
    }
}
module.exports = { welcomepage }