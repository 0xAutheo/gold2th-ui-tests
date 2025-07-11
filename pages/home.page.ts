import { type Page } from "@playwright/test";
import BasePage from "./base.page";

export default class HomePage extends BasePage {
    readonly path: string;

    constructor(page: Page) {
        super(page);
        this.path = "/";
    }

    async navigate(): Promise<void> {
        const baseUrl = process.env.APP_URL || "http://localhost:8002";
        const fullUrl = `${baseUrl}${this.path}`;
        await this.page.goto(fullUrl);
        await this.page.bringToFront(); // Ensure it's the active tab
    }
}
