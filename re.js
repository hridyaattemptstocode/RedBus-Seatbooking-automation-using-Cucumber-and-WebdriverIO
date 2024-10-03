const { Given, When, Then } = require('@wdio/cucumber-framework');
const plswork = require('C:/Users/user/webdriverio1/pageobjects/redbuspom/redpom.js');
Given(/^user is on homepage$/, async () => {
    await plswork.openHomePage();
    await browser.pause(3000);
});

When(/^user enters Source and Destination$/, async () => {
	await plswork.enterSourceAndDestination('ISBT Kashmiri Gate', 'Private Bus Stand');
    await browser.pause(3000)
});

When(/^selects a date from calendar$/, async () => {
	const targetMonth = 'Oct';
    const targetYear = '2024';
    const targetDate = '10';
    await plswork.selectDate(targetMonth, targetYear, targetDate);
    await plswork.clickSearchButton();
    await browser.pause(3000)
});

When(/^selects to view seats on the bus$/, async () => {
	await plswork.viewSeats()
    await browser.pause(5000)
});

When(/^selects a certain seat$/, async() => {
	await plswork.clickOnSeat(250, 76);
    await browser.pause(5000)
    
});

Then(/^Proceeds to Payment$/, async () => {
	 await plswork.Payment()
     await browser.pause(10000)
});

