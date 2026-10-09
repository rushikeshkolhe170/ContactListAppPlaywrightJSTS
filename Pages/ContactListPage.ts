import {expect, type Locator, type Page} from "@playwright/test";

export class ContactListPage 
{  
    private page : Page;
    private contactList : Locator;
    private addNewContactBtn : Locator;
    private editContact : Locator;
    private firstName1 : Locator;
    private lastName1 : Locator;
    private firstName : Locator;
    private lastName : Locator;
    private dob : Locator;
    private email : Locator;
    private phone : Locator;
    private addressOne : Locator;
    private addressTwo : Locator;
    private street1 : Locator;
    private street2 : Locator;
    private city : Locator;
    private city1 : Locator;
    private stateOrProvince : Locator;
    private stateOrProvince1 : Locator;
    private zipOrPostalCode : Locator;
    private postalCode : Locator;
    private country : Locator;
    private country1 : Locator;
    private submitBtn : Locator;
    private cancelBtn : Locator;
    private errorMsg : Locator;
    private footerMsg : Locator;
    private footerImg : Locator;
    private tablesRows : Locator;
    private deleteBtn : Locator;
    private returnBtn : Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactList = page.locator('#myTable');
    this.addNewContactBtn = page.locator('#add-contact');
    this.editContact = page.locator('#edit-contact');
    this.firstName1 = page.locator('#firstName');
    this.lastName1 = page.locator('#lastName');
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.dob = page.locator('#birthdate');
    this.email = page.locator('#email');
    this.phone = page.locator('#phone');
    this.addressOne = page.getByPlaceholder('Address 1');
    this.addressTwo = page.getByPlaceholder('Address 2');
    this.street1 = page.locator('#street1');
    this.street2 = page.locator('#street2');
    this.city = page.getByPlaceholder('City');
    this.city1 = page.locator('#city');
    this.stateOrProvince = page.getByPlaceholder('State or Province');
    this.stateOrProvince1 = page.locator('#stateProvince');
    this.zipOrPostalCode = page.getByPlaceholder('Postal Code');
    this.postalCode = page.locator('#postalCode');
    this.country = page.getByPlaceholder('Country');
    this.country1 = page.locator('#country');
    this.submitBtn = page.locator('#submit');
    this.cancelBtn = page.locator('#cancel');
    this.errorMsg = page.locator('#error');
    this.footerImg = page.locator('img[src="/img/thinkingTesterLogo.png"]');
    this.footerMsg = page.locator('footer p');
    this.tablesRows = page.locator('#myTable').locator('tr');
    this.deleteBtn = page.locator('#delete');
    this.returnBtn = page.locator('#return');
  }

    async getContactListDetails() 
    {
        try
        {
            await this.contactList.waitFor({state : 'visible', timeout : 10000});
        } catch
        {
            console.log('Table does not exist because there is no data');
            return;
        }
        const headers : Locator = this.contactList.locator('th');
        const numberOfHeaders : number = await headers.count();
        const headerNames : string[] = [];
        for(let i = 0; i < numberOfHeaders; i++)
        {
            headerNames.push((await headers.nth(i).textContent())?.trim() ?? '');
        }
        const rows : Locator = this.contactList.locator('tr');
        const numberOfRows : number = await this.contactList.locator('tr').count();
        for(let i = 1; i < numberOfRows; i++)
        {
            const cells : Locator = rows.nth(i).locator('td');
            const colCount : number = await cells.count();
            console.log('Row number ' + [i] + ' contains below details:')
            for(let j = 0; j < colCount; j++)
            {
                if(await cells.nth(j).isVisible())
                {
                    const cellValue : string | null = await cells.nth(j).textContent();
                    console.log(`${headerNames[j-1]} : ${cellValue}`);   
                }
            }
            console.log('--------------------------------------------');
        }
    }

    async addNewContact(firstName: string, lastName: string, DOB : string, email: string, phone: string, addressOne: string, addressTwo: string, city: string, 
        stateOrProvince: string, zipOrPostalCode: string, country: string) : Promise<void>
    {
        await this.addNewContactBtn.click();
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.dob.fill(DOB);
        await this.email.fill(email);
        await this.phone.fill(phone);
        await this.addressOne.fill(addressOne);
        await this.addressTwo.fill(addressTwo);
        await this.city.fill(city);
        await this.stateOrProvince1.fill(stateOrProvince);
        await this.postalCode.fill(zipOrPostalCode);
        await this.country.fill(country);
        await this.submitBtn.click();
        await this.contactList.waitFor({state: 'visible'});
        let userFound : boolean = false;
        const fullName : string = firstName + ' ' + lastName;
        const userNames : Locator = this.contactList.locator('tr').locator('td:nth-child(2)');
        const userEmails : Locator = this.contactList.locator('tr').locator('td:nth-child(4)');
        const emailCount : number = await userEmails.count();
        for(let i = 0; i < emailCount; i++)
        {
            const email1 = (await userEmails.nth(i).textContent())?.trim();
            const user1 = (await userNames.nth(i).textContent())?.trim();
            if(email1 === email && user1 === fullName)
            {
                userFound = true;
                break;
            }
        }
        if(!userFound)
        {
            throw new Error('Record does not exist in the table with ' + email + ' and ' + firstName + ' ' + lastName + ' name');
        }
    }

    async editContactDetails(firstName: string, lastName: string, DOB : string, email: string, phone: string, addressOne: string, addressTwo: string, city: string, 
        stateOrProvince: string, zipOrPostalCode: string, country: string) : Promise<void>
    {
        await this.editContact.click();
        await expect(this.firstName1).not.toHaveValue('');
        await this.firstName1.fill('');
        await this.lastName1.fill('');
        await this.dob.fill('');
        await this.email.fill('');
        await this.phone.fill('');
        await this.street1.fill('');
        await this.street2.fill('');
        await this.city1.fill('');
        await this.stateOrProvince1.fill('');
        await this.postalCode.fill('');
        await this.country1.fill('');
        await this.firstName1.fill(firstName);
        await this.lastName1.fill(lastName);
        await this.dob.fill(DOB);
        await this.email.fill(email);
        await this.phone.fill(phone);
        await this.street1.fill(addressOne);
        await this.street2.fill(addressTwo);
        await this.city1.fill(city);
        await this.stateOrProvince1.fill(stateOrProvince);
        await this.postalCode.fill(zipOrPostalCode);
        await this.country1.fill(country);
        await this.submitBtn.click();
        await this.returnBtn.click();
         try
        {
            await this.contactList.waitFor({state : 'visible', timeout : 10000});
        } catch
        {
            console.log('Table does not exist because there is no data');
            return;
        }
        await this.contactList.waitFor({state: 'visible'});
        let userFound : boolean = false;
        const fullName : string = firstName + ' ' + lastName;
        const userNames : Locator = this.contactList.locator('tr').locator('td:nth-child(2)');
        const userEmails : Locator = this.contactList.locator('tr').locator('td:nth-child(4)');
        const emailCount : number = await userEmails.count();
        for(let i = 0; i < emailCount; i++)
        {
            const email1 = (await userEmails.nth(i).textContent())?.trim();
            const user1 = (await userNames.nth(i).textContent())?.trim();
            if(email1 === email && user1 === fullName)
            {
                userFound = true;
                break;
            }
        }
        if(!userFound)
            {
                throw new Error('Record does not exist in the table with ' + email + ' and ' + firstName + ' ' + lastName + ' name');
            }
    }

    async addContactFormValidations(firstName : string, lastName : string, invalidDOB : string, invalidPhone : string, invalidEmail : string)
    {
        await this.addNewContactBtn.click();
        await this.submitBtn.click();
        await this.errorMsgCheck('Contact validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required.')
        await this.firstName.fill(firstName);
        await this.submitBtn.click();
        await this.errorMsgCheck('Contact validation failed: lastName: Path `lastName` is required.')
        await this.firstName.clear();
        await this.lastName.fill(lastName);
        await this.submitBtn.click();
        await this.errorMsgCheck('Contact validation failed: firstName: Path `firstName` is required.')
        await this.lastName.clear();
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.dob.fill(invalidDOB);
        await this.submitBtn.click();
        await this.errorMsgCheck('Contact validation failed: birthdate: Birthdate is invalid')
        await this.dob.clear();
        await this.phone.fill(invalidPhone);
        await this.submitBtn.click();
        await this.errorMsgCheck('Contact validation failed: phone: Phone number is invalid')
        await this.phone.clear();
        await this.email.fill(invalidEmail);
        await this.submitBtn.click();
        await this.errorMsgCheck('Contact validation failed: email: Email is invalid')
        await this.email.clear();
        await this.dob.fill(invalidDOB);
        await this.phone.fill(invalidPhone);
        await this.email.fill(invalidEmail);
        await this.submitBtn.click();
        await this.errorMsgCheck('Contact validation failed: birthdate: Birthdate is invalid, email: Email is invalid, phone: Phone number is invalid')
        await this.cancelBtn.click();
    }

    async deleteContact(firstName : string, lastName : string, email : string)
    {
        try
        {
            await this.contactList.waitFor({state : 'visible', timeout : 10000});
        } catch
        {
            console.log('Table does not exist because there is no data');
            return;
        }
        await this.clickOnParticularContact(firstName, lastName, email);
        await this.firstName1.waitFor({state : 'visible'});
        this.page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept();
        })
        await this.deleteBtn.click();
        const text : string = await this.contactAvailable(firstName, lastName, email);
        if(text === 'Contact Found')
        {
            throw new Error('Error: Contact is still inside the table')
        }
    }

    async footerDateVerification()
    {
        await expect(this.footerImg).toBeVisible();
        await expect(this.footerImg).toHaveScreenshot('footerimage.png');
        await expect(this.footerMsg).toHaveText('Created by Kristin Jackvony, Copyright 2021 ');
    }

    async errorMsgCheck(text : string)
    {
        await this.errorMsg.waitFor({state : 'visible'});
        await expect(this.errorMsg).toHaveText(text);
    }

    async captureScreenshot(imageName : string)
    {
        await this.footerImg.screenshot({ path : imageName + '.png' });
    }

    async clickOnParticularContact(firstName : string, lastName : string, email : string)
    {
        try
        {
            await this.contactList.waitFor({state : 'visible', timeout : 10000});
        } catch
        {
            console.log('Table does not exist because there is no data');
            return;
        }
        //await this.firstName1.waitFor({state : 'visible'});
        let userFound : boolean = false;
        const fullName : string = firstName + ' ' + lastName;
        const userNames : Locator = this.tablesRows.locator('td:nth-child(2)');
        console.log(await userNames.count());
        const userEmails : Locator = this.tablesRows.locator('td:nth-child(4)');
        const emailCount : number = await userEmails.count();
        console.log(emailCount);
        for(let i = 0; i < emailCount; i++)
        {
            const email1 = (await userEmails.nth(i).textContent())?.trim();
            console.log(email1);
            const user1 = (await userNames.nth(i).textContent())?.trim();
            console.log(user1);
            if(email1 === email && user1 === fullName)
            {
                userFound = true;
                await userNames.nth(i).click();
                break;
            }
        }
        if(!userFound)
        {
            throw new Error('Record does not exist in the table with ' + email + ' and ' + firstName + ' ' + lastName + ' name');
        }
    }

    async contactAvailable(firstName : string, lastName : string, email : string)
    {
        const fullName : string = firstName + ' ' + lastName;
        const userNames : Locator = this.tablesRows.locator('td:nth-child(2)');
        const userEmails : Locator = this.tablesRows.locator('td:nth-child(4)');
        const emailCount : number = await userEmails.count();
        for(let i = 0; i < emailCount; i++)
        {
            const email1 = (await userEmails.nth(i).textContent())?.trim();
            const user1 = (await userNames.nth(i).textContent())?.trim();
            if(email1 === email && user1 === fullName)
            {
                return 'Contact Found';
            }
        }
        return 'Conact not Found';
    }
}

     