import {type Locator, type Page} from "@playwright/test";

export class LoginPage 
{  
    private page : Page;
    private username : Locator;
    private password : Locator;
    private submitBtn : Locator;
    private errorMsg : Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByPlaceholder('Email');
    this.password = page.getByPlaceholder('Password');
    this.submitBtn = page.getByText('Submit');
    this.errorMsg = page.locator('#error');
  }

    async loginToApp(username: string, password: string) 
    {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.submitBtn.click();
    }

    async getErrorMessage() : Promise<string | null>
    {
        await this.errorMsg.waitFor({state: 'visible'});
        let error = await this.errorMsg.textContent();
        return error;
    }
  }