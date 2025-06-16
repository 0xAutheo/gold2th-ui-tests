import {test} from "../fixtures/didFixture";


test.describe("Dapp Wallet Connection Test", () => {
    test("Connect wallet and verify auth flow", async ({homePage}) => {
        await homePage.navigate();
        await homePage.connectWallet();
        // Add your assertions here if needed
        await homePage.page.waitForTimeout(3000); // placeholder for visual/manual check or continue flow
    });
});
