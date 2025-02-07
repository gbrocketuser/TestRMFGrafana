const { expect } = require('@playwright/test');

class datasourcePage {
    constructor(page) {
        this.page = page;
        this.datasource_banner = this.page.locator(".css-1p650oa p");
        this.datasource_manager = this.page.locator(".css-1cqw476");
        this.RMF_banner = this.page.locator(".css-3oq5wu");
        this.RMF_datasource_header = this.page.locator(".css-1l9jgkm");
    }

    async check_datasource_banner(datasource_title) {
        await expect(this.datasource_banner).toHaveText(datasource_title);
        await this.datasource_manager.click();
    }

    async check_datasource_manager(RMF_banner, add_datasource, datasource_header) {
        await expect(this.RMF_banner).toHaveText(RMF_banner);
        // await this.page.getByRole("link", {name : "IBM RMF for z/OS"}).click();
        await this.page.locator(".css-btig8a").filter({hasText: "IBM RMF for z/OS"}).getByRole("button").click();
        // await this.page.getByRole("button", { name: add_datasource }).click();
        // await expect(this.RMF_datasource_header).toHaveText(datasource_header);
    }

}
module.exports = { datasourcePage }