const { expect } = require('@playwright/test');

class datasourcePage {
    constructor(page) {
        this.page = page;
        this.datasource_banner = this.page.locator(".css-1p650oa p");
        this.datasource_manager = this.page.locator(".css-1cqw476");
        this.RMF_banner = this.page.locator(".css-3oq5wu");
        this.RMF_datasource_header = this.page.locator(".css-1l9jgkm");
        this.ds_list = this.page.locator(".card-item-name");
    }

    async check_datasource_banner(datasource_title) {
        await expect(this.datasource_banner).toHaveText(datasource_title);
        await this.datasource_manager.click();
    }

    async add_rmf_datasource(add_datasource, datasource_header) {
        await this.page.getByRole("button", { name: add_datasource }).click();
        await expect(this.RMF_datasource_header).toContainText(datasource_header);
    }

    async check_datasource_plugin_manager(RMF_banner) {
        await expect(this.RMF_banner).toHaveText(RMF_banner);
    }

    async delete_rmf_datasource(){
        await this.ds_list.first().waitFor();
        const dslist = await this.ds_list.count();
        console.log(dslist);
        for (let i=0 ; i < dslist; i++)
            {
                if (await this.ds_list.nth(i).textContent() === "IBM RMF for z/OS")
                {
                    await this.page.locator("[title=\"Data Source Settings\"]").nth(i).click();                
                    await this.page.locator("[data-testid=\"Data source settings page Delete button\"]").click(); 
                    await this.page.locator("[data-testid=\"data-testid Confirm Modal Danger Button\"]").click();
                    break;
                } 
            }

    }

   

}
module.exports = { datasourcePage }