import {test, expect} from '@playwright/test';
import {LoginPage} from '../Pages/LoginPage';

test('Login - Continue real api request @apis @continue', async ({page}) : Promise<void> => {

    await page.route('**/users/login', async (route) : Promise<void> => {
        const postData : any = route.request().postDataJSON();
        console.log('POST DATA:', postData);
        console.log('INTERCEPTED: ', route.request().url());
        await route.continue();
    });
    await page.goto('/');
    const loginPageObj = new LoginPage(page);
    await loginPageObj.loginToApp(process.env.USER_NAME2!, process.env.PASSWORD2!);
});

test('Login - Modifying real api request to deliberately fail login and assertion check @apis @continue', async ({page}) : Promise<void> => {

    // Below route modifies the request whenever hit the url mention in the route method.
    await page.route('**/users/login', async (route) : Promise<void> => {
        const postData : any = route.request().postDataJSON();
        postData.email = 'RajanRao@gmail.com';
        postData.password = 'Random#123';
        await route.continue({
            postData: JSON.stringify(postData),
        });
    });
    await page.goto('/');
    const loginPageObj : LoginPage = new LoginPage(page);
    // We are sending correct username and password in the method.
    await loginPageObj.loginToApp(process.env.USER_NAME2!, process.env.PASSWORD2!);
    // after hitting above method request hit the route method url and credential gets modify to wrong username and passwrod therefor next assertion gets passed.
    // sjadhav@gmail.com becomes RajanRao@gmail.com, adn Sjadhav@123 becomes Random#123
    expect(await loginPageObj.getErrorMessage()).toBe('Incorrect username or password');
});

test('Login - Changing response to 200 OK for incorrect login credentials @apis @fulfill', async ({page}) : Promise<void> => {

    // Below route modifies the response whenever hit the url mention in the route method.
    await page.route('**/users/login', async (route) : Promise<void> => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'Login successful' }),
        });
    });
    await page.goto('/');
    const loginPageObj : LoginPage = new LoginPage(page);
    // We are sending incorrect username and password in the method.
    await loginPageObj.loginToApp(process.env.USER_NAME1!, process.env.PASSWORD1!);
    // after hitting above method request hit the route method url and response gets modify from fail to status 200.
    // When login api return 200, the app redirects to contact list page and assertion gets passed. (on UI it is not possible to check)
    await expect(page).toHaveURL(/contactList/);
});

test('Login - Changing response to 401 Unauthorized for correct login credentials @apis @fulfill', async ({page}) : Promise<void> => {

    // Below route modifies the response whenever hit the url mention in the route method.
    await page.route('**/users/login', async (route) : Promise<void> => {
        await route.fulfill({
            status: 401,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'Unauthorized' }),
        });
    });
    await page.goto('/');
    const loginPageObj : LoginPage = new LoginPage(page);
    // We are sending correct username and password in the method.
    await loginPageObj.loginToApp(process.env.USER_NAME2!, process.env.PASSWORD2!);
    // after hitting above method request hit the route method url and response gets modify from pass to status 401.
    // When login api return 401, the error message is displayed.
    expect(await loginPageObj.getErrorMessage()).toBe('Incorrect username or password');
});

test('Login - Aborting send request to server @apis @abort', async ({page}) : Promise<void> => {

    // Below route abort the request whenever hit the url mention in the route method.
    await page.route('**/users/login', async (route) : Promise<void> => {
        await route.abort('connectionfailed');
    });
    await page.goto('/');
    const loginPageObj : LoginPage = new LoginPage(page);
    const requestFailedPromise : Promise<string> = new Promise<string>((resolve) => {
        page.on('requestfailed', (request) => {
            if (request.url().includes('/users/login')) {
                console.log('Request failed:', request.failure());
                resolve(request.failure()?.errorText || 'Unknown error');
            }
        });
    });
    // We are sending correct username and password in the method.
    await loginPageObj.loginToApp(process.env.USER_NAME2!, process.env.PASSWORD2!);
    // after hitting above method request hit the route method url but network does not send that request to server.
    const errorText : string = await requestFailedPromise;
    expect(errorText).toBe('net::ERR_CONNECTION_FAILED');
});