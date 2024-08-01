const {test, expect, request}=require('@playwright/test');
const {APIUtils}=require('../utils/APIUtils.js')
const loginPayload={userEmail: "testar@mailinator.com", userPassword: "Test@123"};
const orderPayload={orders: [{country: "Cuba", productOrderedId: "6581ca399fd99c85e8ee7f45"}]};
let response;
test.beforeAll( async ()=>
    {
      //LoginAPI
    const apicontext=await request.newContext();
    const apiUtils=new APIUtils(apicontext,loginPayload);
    response=await apiUtils.createOrder(orderPayload);
      // Order API
    })


test('Place the order', async ({page})=>
    {
      // const apiUtils=new APIUtils(apicontext,loginPayload);

      //  const orderid=createOrder(orderPayload);

       page.addInitScript(value=>{
        window.localStorage.setItem('token', value);

       },response.token)
         await page.goto("https://rahulshettyacademy.com/client");
        // const userName= page.locator('#userEmail');
        // const passWord=page.locator("[type='password']");
        // const signIn= page.locator("#login");
        
        // //get title-assertion
        // console.log(await page.title());
        
        // await userName.fill(email);
        // await passWord.fill("Test@123");
        // await signIn.click();
        // await page.waitForLoadState('networkidle')
       // await page.locator(".card-body b").first().waitFor();

        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        const rows=await page.locator("tbody tr");
        
        for(let i=0;i<await rows.count();i++)
          {
            const rowOrderId=await rows.nth(i).locator("th").textContent();
            if(response.orderId.includes(rowOrderId))
              {
                await rows.nth(i).locator("button").first().click();
                break;
              }
          }

          const confirmOrderId=await page.locator(".col-text").textContent();
        
          expect(response.orderId.includes(confirmOrderId)).toBeTruthy();

         

    });