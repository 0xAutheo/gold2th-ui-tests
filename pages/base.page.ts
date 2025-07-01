import {type Page} from "@playwright/test";
import * as metamask from "@synthetixio/synpress/commands/metamask";

export default class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async connectWallet(): Promise<void> {
        await this.page.getByRole('link', {name: 'Connect Wallet', exact: true}).click();
        await this.page.locator("//div[text()='Connect Wallet']").click()
        //await this.page.getByRole('button', {name: 'Connect Wallet →'}).click();
        await this.page.getByTestId('rk-wallet-option-metaMask').click();
        await this.handleMetamaskFlow();
    }

    private async handleMetamaskFlow(): Promise<void> {
        await metamask.acceptAccess();
        await this.page.getByRole('button', {name: 'Authenticate with Autheo →'}).click();
        await metamask.confirmSignatureRequest();
        await this.page.getByRole('button', {name: 'Authorize Data Access →'}).click();

    }
}
