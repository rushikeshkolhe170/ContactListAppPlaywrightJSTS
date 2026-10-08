import {test, expect, request} from '@playwright/test';
import {LoginPage} from '../Pages/LoginPage';

test('Contact List App login', async ({page}) : Promise<void> => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  await expect(page).toHaveTitle(/Contact List App/);
  const loginPageObj : LoginPage = new LoginPage(page);
  await loginPageObj.loginToApp(process.env.USER_NAME1!, process.env.PASSWORD1!);
  expect(await loginPageObj.getErrorMessage()).toBe('Incorrect username or password');
});

test('Contact List App login api @apis', async ({browser, request}) : Promise<void> => {
  const response : any = await request.post('/users/login', {
    data: {
      email: process.env.USER_NAME2!,
      password: process.env.PASSWORD2!,
    }
  });
  expect(response.ok()).toBeTruthy();
  const data : any = await response.json();
  console.log('API RESPONSE:', data);
  const token : string = data.token;
  expect(token).toBeTruthy();
  const context : any = await browser.newContext();
  await context.addInitScript((token: string) => {
    localStorage.setItem('token', token);
  }, token);
  const page : any = await context.newPage();
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/contactList', { waitUntil: 'domcontentloaded' });
  console.log('PAGE URL:', page.url());
  await expect(page).toHaveURL(/contactList/);  
});