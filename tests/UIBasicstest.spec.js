const { test, expect } = require('@playwright/test');
const { use } = require('../playwright.config');


test('@Web Browser Context Playright test', async ({ browser }) => {


    //chrome-plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    page.route();
    const userName = page.locator('input#username');
    const passWord = page.locator("[name='password']");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-title a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css, xpath
    //type, fill with the latest version of playwright type is depcreated sp we fully depending on fill method only to enter any data

    await userName.fill("testar@mailinator.com");
    await passWord.fill("Test@1234");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //to clear the entered information from fields

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await passWord.fill("");
    await passWord.fill("learning");
    await signIn.click();

    console.log(await cardTitles.first().textContent());
    //console.log(await cardTitles.last().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);



});

test('Page Playright test', async ({ page }) => {

    await page.goto("https://google.com");
    //get title-assertion
    console.log(await page.title());

    await expect(page).toHaveTitle("Google");

    // 
});


test(' UI controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('input#username');
    const passWord = page.locator("[name='password']");
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents']");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    expect(await page.locator(".radiotextsty").last()).toBeChecked();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    console.log(await page.locator("#terms").isChecked());
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    //assertion

    await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test('Child window handling', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('input#username');
    const documentLink = page.locator("[href*='documents']");
    // promise states-> pending, rejected, fullfilled
    const [newPage] = await Promise.all
        ([
            context.waitForEvent('page'),//listen for any new page is open

            documentLink.click(),

        ])
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(text);
    console.log(domain);
    await userName.fill(domain);

    console.log(await userName.textContent());


});