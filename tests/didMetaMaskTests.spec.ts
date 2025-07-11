import {test,expect} from "../fixtures/didFixture";


test.describe("Dapp Wallet Connection Test", () => {
    test.beforeAll("Connect wallet and verify auth flow", async ({homePage,page}) => {
        await homePage.navigate();
        await homePage.connectWallet();
        // Add your assertions here if needed
    })

    // placeholder for visual/manual check or continue flow
    test("DID creation", async ({homePage,page}) => {
       page.goto('http://localhost:8002/')
        await page.locator("//h3[text()='DID Manager']").click()
        await page.locator("//button[text()='Create Your First DID']").click()
        await page.locator("//button[text()='View Credentials']").click()


        await expect(page.locator("//div[@class='glass-card p-4 cursor-pointer hover:bg-white/5 transition-colors']")).toHaveCount(4)

        await homePage.page.waitForTimeout(3000);
    });

    test("Profile edit", async ({homePage,page}) => {
        await  page.goto('http://localhost:8002/')
        await  page.locator("//button[@aria-label='Profile menu']//*[name()='svg'][2]").click()
        await  page.locator("//span[text()='Settings']").click()
        await page.locator("//button[text()='Edit']").click()
        //edit data
        await page.fill('//input[@type="text"]', '');
        await page.locator('//input[@type="text"]').fill('Aruna')

        //await page.fill('//input[@type="email"]', '');
        await page.locator('//input[@type="email"]').fill('aruna@email.com')

        const timezoneDropdown = page.locator("//label[normalize-space()=\"Timezone\"]/following-sibling::select")
        await timezoneDropdown.selectOption({ label: 'Pacific Time (Los Angeles)' });

        const languageDropdown = page.locator('//label[normalize-space()="Language"]/following-sibling::select');

        // Select an option by label
        await languageDropdown.selectOption({ label: 'Français' });

        await page.locator("//button[text()='Update']").click()

        await expect(page.locator("//h2[text()=\'Profile Information\']")).toHaveText('Profile Information');
        await expect(page.locator('//input[@type="text"]')).toHaveValue('Aruna')
        await expect(page.locator('//input[@type="email"]')).toHaveValue('aruna@email.com')
        await expect(page.locator("//label[normalize-space()=\"Timezone\"]/following-sibling::select")).toHaveValue('Pacific Time (Los Angeles)')
        await expect(page.locator('//label[normalize-space()="Language"]/following-sibling::select')).toHaveValue('Français' )


    })


});