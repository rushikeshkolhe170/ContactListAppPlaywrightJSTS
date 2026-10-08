import {type Locator, type Page} from "@playwright/test";

export class ContactListPage 
{  
    private page : Page;
    private contactList : Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactList = page.locator('#myTable');
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
}