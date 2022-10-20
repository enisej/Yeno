const puppeteer = require('puppeteer');
const {Login} = require("./login/login");
const {theoryTest} = require("./theoryTest/theoryTest.js");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    Login(page).then(() => {
        console.log('Logged in')
        theoryTest(page)
    })


})();