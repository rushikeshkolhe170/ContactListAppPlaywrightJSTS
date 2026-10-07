import {test, expect} from '@playwright/test';
import {LoginPage} from '../Pages/LoginPage';

test('Contact List App open', async ({page}) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  await expect(page).toHaveTitle(/Contact List App/);
  const loginPageObj = new LoginPage(page);
  await loginPageObj.loginToApp(process.env.USER_NAME1!, process.env.PASSWORD1!);
  expect(await loginPageObj.getErrorMessage()).toBe('Incorrect username or password');
});