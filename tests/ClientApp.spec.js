const {test, expect}=require('@playwright/test');
const { use } = require('../playwright.config');
const { assert } = require('console');



  test.skip('Client page login test', async ({page})=>
        {
           
            const products=page.locator(".card-body");
            const productName="ZARA COAT 3";
            const email="testar@mailinator.com";
            await page.goto("https://rahulshettyacademy.com/client");
            const userName= page.locator('#userEmail');
            const passWord=page.locator("[type='password']");
            const signIn= page.locator("#login");
            
            //get title-assertion
            console.log(await page.title());
            
            await userName.fill(email);
            await passWord.fill("Test@123");
            await signIn.click();
            await page.waitForLoadState('networkidle')
           // await page.locator(".card-body b").first().waitFor();
            const productTitles=await page.locator(".card-body b").allTextContents();
            console.log(productTitles);
            const count=await products.count();
            for(let i=0;i<count;i++)
              {
                if(await products.nth(i).locator("b").textContent()=== productName)
                  {
                    // add to cart
                    await products.nth(i).locator("text=' Add To Cart'").click();
                    break;

                  }

              }
            await page.locator("[routerlink*='cart']").click();

            await page.locator("div li").first().waitFor();

            const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
            expect(bool).toBeTruthy();
            
            
            await page.locator("button[type='button']").last().click();
            
            await page.locator('input[type="text"]').nth(1).fill('666')
            await page.locator('input[type="text"]').nth(2).fill('rahul shetty');
            await page.locator('input[name="coupon"]').fill('rahulshettyacademy');
            //await page.locator("button[type='submit']").click();

            await page.locator("[placeholder*='Country']").pressSequentially("Ind",{ delay: 100 });
            const dropdown=page.locator(".ta-results");
            await dropdown.waitFor();
            const optionsCount=await dropdown.locator("button").count();
            for(let i=0;i<optionsCount;i++)
            {
              const text=await dropdown.locator("button").nth(i).textContent();
              if(text===" India")
                {
                  await dropdown.locator("button").nth(i).click();
                  break;
                }
                
            }
            
            expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
            await page.locator(".action__submit").click();
            console.log(await page.locator(".hero-primary").textContent());
            expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
            const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
            console.log(orderId);

            await page.locator("button[routerlink*='myorders']").click();
            await page.locator("tbody").waitFor();
            const rows=await page.locator("tbody tr");
            
            for(let i=0;i<await rows.count();i++)
              {
                const rowOrderId=await rows.nth(i).locator("th").textContent();
                if(orderId.includes(rowOrderId))
                  {
                    await rows.nth(i).locator("button").first().click();
                    break;
                  }
              }

              const confirmOrderId=await page.locator(".col-text").textContent();

              expect(orderId.includes(confirmOrderId)).toBeTruthy();

             

        });


        