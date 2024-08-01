
const { test, expect, request } = require('@playwright/test');


test('@Security Test Request Intercept', async ({ page }) => {


    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const email = "testar@mailinator.com";
    await page.goto("https://rahulshettyacademy.com/client");
    const userName = page.locator('#userEmail');
    const passWord = page.locator("[type='password']");
    const signIn = page.locator("#login");
   
    //get title-assertion
    console.log(await page.title());

    await userName.fill(email);
    await passWord.fill("Test@123");
    await signIn.click();
    await page.waitForLoadState('networkidle')

    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route =>
        route.continue({
            url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=66738bfeae2afd4c0b053499"
        })
    );

    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");




})