import {type Page} from "@playwright/test";
import BasePage from "./base.page";

export default class HomePage extends BasePage {
    readonly path: string;

    constructor(page: Page) {
        super(page);
        this.path = "/";
    }

    async navigate(): Promise<void> {
        await this.page.goto(this.path);
    }
}
