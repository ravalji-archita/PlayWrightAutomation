
import {test,expect} from '@playwright/test';
import {customtest} from '../utils_ts/test-base';

import {use} from '../playwright.config';
//const { assert } = require('console');

import { POManager } from '../pageobjects_ts/POManager';
//Json->string->js object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

for (const data of dataset) {



  test(`@Web Client App login ${data.productName}`, async ({page}) => {
    const poManager = new POManager(page);
    const products = page.locator(".card-body");

    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(data.username, data.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProduct(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.CardDetail();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    let orderId:any;
    orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

  });
}

  
  customtest(`Client App login A`, async ({page,testDataForOrder}) => {
    const poManager = new POManager(page);
    const products = page.locator(".card-body");

    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProduct(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();
  })

