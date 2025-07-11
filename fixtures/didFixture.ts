import { type BrowserContext, chromium, test as base } from "@playwright/test";
import { initialSetup } from "@synthetixio/synpress/commands/metamask";
import { prepareMetamask } from "@synthetixio/synpress/helpers";
import { setExpectInstance } from "@synthetixio/synpress/commands/playwright";
import { resetState } from "@synthetixio/synpress/commands/synpress";
import dotenv from "dotenv";
import HomePage from "../pages/home.page";

dotenv.config();

interface PageFixtures {
    context: BrowserContext;
    homePage: HomePage;
}

let sharedContext: BrowserContext;

export const test = base.extend<PageFixtures>({
    context: async ({}, use) => {
        if (!sharedContext) {
            await setExpectInstance(expect);

            const metamaskPath: string = await prepareMetamask(
                process.env.METAMASK_VERSION ?? "10.25.0"
            );

            const browserArgs = [
                `--disable-extensions-except=${metamaskPath}`,
                `--load-extension=${metamaskPath}`,
                "--remote-debugging-port=9222",
            ];

            if (process.env.CI) browserArgs.push("--disable-gpu");
            if (process.env.HEADLESS_MODE === "true") browserArgs.push("--headless=new");

            sharedContext = await chromium.launchPersistentContext("", {
                headless: false,
                args: browserArgs,
            });

            await sharedContext.pages()[0].waitForTimeout(3000);

            await initialSetup(chromium, {
                secretWordsOrPrivateKey: process.env.METAMASK_SETUP_PRIVATE_KEY,
                network: process.env.METAMASK_SETUP_NETWORK,
                password: process.env.METAMASK_SETUP_PASSWORD,
                enableAdvancedSettings: true,
                enableExperimentalSettings: false,
            });

            // ✅ Ensure app tab is opened and active (without closing others)
            const appUrl = process.env.APP_URL!;
            let appPage = sharedContext.pages().find(p =>
                p.url().startsWith(appUrl)
            );

            if (!appPage) {
                appPage = await sharedContext.newPage();
                await appPage.goto(appUrl);
            }

            await appPage.bringToFront(); // ✅ Make app tab visible
        }

        await use(sharedContext);
    },

    homePage: async ({ context }, use) => {
        const appUrl = process.env.APP_URL!;

        // Try to find the DApp tab
        let appPage = context.pages().find(p =>
            p.url().startsWith(appUrl)
        );

        // If not found, open the DApp in a new tab
        if (!appPage) {
            appPage = await context.newPage();
            await appPage.goto(appUrl);
        }

        await appPage.bringToFront(); // Ensure it's active
        const homePage = new HomePage(appPage);
        await use(homePage);
    }
    ,
});

export const expect = test.expect;
