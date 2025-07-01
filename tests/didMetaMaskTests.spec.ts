import {test,expect} from "../fixtures/didFixture";


test.describe("Dapp Wallet Connection Test", () => {
    test("Connect wallet and verify auth flow", async ({homePage,page}) => {
        await homePage.navigate();
        await homePage.connectWallet();
        // Add your assertions here if needed

        // placeholder for visual/manual check or continue flow

        await page.locator("//h3[text()='DID Manager']").click()
        await page.locator("//button[text()='Create Your First DID']").click()
        await page.locator("//button[text()='View Credentials']").click()


        await expect(page.locator("//div[@class='glass-card p-4 cursor-pointer hover:bg-white/5 transition-colors']")).toHaveCount(4)

        await homePage.page.waitForTimeout(3000);
    });
});
