
import{test,expect,Locator,Page} from '@playwright/test';
export class OrdersReviewPage
{

    page:Page;

   country:Locator;
    dropdown:Locator;
    emailId:Locator;
    submit:Locator;
    orderConfirmationText:Locator;
    orderId:Locator;

    csvvalue:Locator;
   cardname:Locator;
   couponvalue :Locator;

constructor(page:Page)
{

    this.page = page;
    this.country = page.locator("[placeholder*='Country']");
    this.dropdown = page.locator(".ta-results");
    this.emailId = page.locator(".user__name [type='text']").first();
    this.submit =  page.locator(".action__submit");
    this.orderConfirmationText = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");

    this.csvvalue= page.locator('input[type="text"]').nth(1);
    this.cardname= page.locator('input[type="text"]').nth(2);
    this.couponvalue= page.locator('input[name="coupon"]');

    
}

async searchCountryAndSelect(countryCode:string,countryName:string)
{

   
    await this.country.type(countryCode,{delay:100});
    await this.dropdown.waitFor();
    const optionsCount = await this.dropdown.locator("button").count();
    for(let i =0;i< optionsCount; ++i)
    {
        let text:any;
        text =  await this.dropdown.locator("button").nth(i).textContent();
        if(text.trim() === countryName)
        {
           await this.dropdown.locator("button").nth(i).click();
           break;
        }
    }

}
async VerifyEmailId(username:string)
{
    await expect(this.emailId).toHaveText(username);
}

async SubmitAndGetOrderId()
{
 await this.submit.click();
 await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
 return await this.orderId.textContent();
}

async CardDetail()
{
   await  this.csvvalue.fill('666');
   await  this.cardname.fill('rahul shetty');
   await this.couponvalue.fill('rahulshettyacademy');
   
}
}
module.exports = {OrdersReviewPage};