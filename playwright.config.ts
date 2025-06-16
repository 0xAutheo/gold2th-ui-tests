import {defineConfig, devices} from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 0,
    workers: 1,
    reporter: [
        ["list"],
        ["html", {outputFolder: "test-report", open: "never"}],
    ],
    outputDir: "./test-results",
    use: {
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
        baseURL: process.env.ENVIRONMENT_URL,
    },
    reportSlowTests: null,
    timeout: 90000,
    projects: [
        {
            name: "chromium",
            use: {...devices["Desktop Chrome"]},
        },
    ],
});
