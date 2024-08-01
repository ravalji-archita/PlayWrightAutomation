const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');
const loginPayload = { userEmail: "testar@mailinator.com", userPassword: "Test@123" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6581ca399fd99c85e8ee7f45" }] };
const fakePayloadOrder = { "data": [], "message": "No Orders" };
let response;
test.beforeAll(async () => {
  //LoginAPI
  const apicontext = await request.newContext();
  const apiUtils = new APIUtils(apicontext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
  // Order API
})


test('Place the order', async ({ page }) => {
  // const apiUtils=new APIUtils(apicontext,loginPayload);

  //  const orderid=createOrder(orderPayload);

  page.addInitScript(value => {
    window.localStorage.setItem('token', value);

  }, response.token)
  await page.goto("https://rahulshettyacademy.com/client");
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {

      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayloadOrder);
      route.fulfill(
        {
          response,
          body,

        });

    });

  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  console.log(await page.locator(".mt-4").textContent());


});