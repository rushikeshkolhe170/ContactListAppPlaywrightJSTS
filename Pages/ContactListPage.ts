import {expect, type Locator, type Page} from "@playwright/test";

export class ContactListPage 
{  
    private page : Page;
    private contactList : Locator;
    private addNewContactBtn : Locator;
    private firstName : Locator;
    private lastName : Locator;
    private dob : Locator;
    private email : Locator;
    private phone : Locator;
    private addressOne : Locator;
    private addressTwo : Locator;
    private city : Locator;
    private stateOrProvince : Locator;
    private zipOrPostalCode : Locator;
    private country : Locator;
    private submitBtn : Locator;
    private cancelBtn : Locator;
    private errorMsg : Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactList = page.locator('#myTable');
    this.addNewContactBtn = page.locator('#add-contact');
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.dob = page.locator('#birthdate');
    this.email = page.locator('#email');
    this.phone = page.locator('#phone');
    this.addressOne = page.getByPlaceholder('Address 1');
    this.addressTwo = page.getByPlaceholder('Address 2');
    this.city = page.getByPlaceholder('City');
    this.stateOrProvince = page.getByPlaceholder('State or Province');
    this.zipOrPostalCode = page.getByPlaceholder('Postal Code');
    this.country = page.getByPlaceholder('Country');
    this.submitBtn = page.locator('#submit');
    this.cancelBtn = page.locator('#cancel');
    this.errorMsg = page.locator('#error');
  }

    async getContactListDetails() 
    {
        await this.contactList.waitFor({state: 'visible'});
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
        await this.stateOrProvince.fill(stateOrProvince);
        await this.zipOrPostalCode.fill(zipOrPostalCode);
        await this.country.fill(country);
        await this.submitBtn.click();
        await this.contactList.waitFor({state: 'visible'});
        let emailFound : boolean = false;
        let userFound : boolean = false;
        const fullName : string = firstName + ' ' + lastName;
        const userNames : Locator = this.contactList.locator('tr').locator('td:nth-child(2)');
        const userCount : number = await userNames.count();
        console.log(userCount);
        const userEmails : Locator = this.contactList.locator('tr').locator('td:nth-child(4)');
        const emailCount : number = await userEmails.count();
        console.log(emailCount);
        for(let i = 0; i < emailCount; i++)
        {
            const email1 = (await userEmails.nth(i).textContent())?.trim();
            const user1 = (await userNames.nth(i).textContent())?.trim();

            console.log('Expected email:', email);
            console.log('Actual email:', email1);
            console.log('Expected name:', fullName);
            console.log('Actual name:', user1);
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

    async errorMsgCheck(text : string)
    {
        await this.errorMsg.waitFor({state : 'visible'});
        await expect(this.errorMsg).toHaveText(text);
    }
}

     