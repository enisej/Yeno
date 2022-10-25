const {fillTheoryTest} = require("./theoryTest/theoryTest.js");
const puppeteer = require('puppeteer');




const puppeteerApp = (async () => {



       await  fillTheoryTest()







})();

module.exports.puppeteerApp = puppeteerApp