import { test } from "@playwright/test";
import { APIutils } from "../Utils/APIutils";
import { ContactListPage } from "../Pages/ContactListPage";

test('Validating the Image and text', async ({ request, context}) : Promise<void> => 
    {
        const loginPayload = {
            email: process.env.USER_NAME2!,
            password: process.env.PASSWORD2!
        };
        const apiUtils : APIutils = new APIutils(request, loginPayload);
        const response = await apiUtils.getToken();
        await context.addCookies([{
            name: 'token',
            value: response.token,
            domain: process.env.COOKIES_DOMAIN!,
            path: '/',
        }]);
        const page = await context.newPage();
        await page.goto(process.env.CONTACT_LIST_URL!, { waitUntil: 'domcontentloaded' });
        const contactListPageObj : ContactListPage = new ContactListPage(page);
        await contactListPageObj.deleteContact('abc', 'abc', 'abc@gmail.com');
    });
