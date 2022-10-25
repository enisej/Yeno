const theoryTestController = require("./theoryTestController.js");
const {testStore} = require("../store/TheoryTestsStore");
const puppeteer = require('puppeteer');
const {Login} = require("../login/login");
const {fetchTheoryTests} = require("../http/TheoryTestAPI.js");

async function fillTheoryTest() {

    const browser = await puppeteer.launch({headless: false})
    await Login(browser)
    await fetchTheoryTests()
    await fill(browser)
    setInterval(()=>{
        fill(browser)
    },14000)

}

async function fill(browser){
    await fetchTheoryTests()
    if(testStore.tests.length === 0){
        return console.log('All rows have been inserted')
    }
    for (let i = 0; i < testStore.tests.length; i++){
        const test = testStore.tests[i]
        const page = await browser.newPage();
        theoryTestController.openModal(page).then(() => {
            theoryTestController.fillWithData(page, test).then(() => {
                theoryTestController.submit(page, test.id).then(() => {

                })
            })
        })
    }
}


module.exports.fillTheoryTest = fillTheoryTest;
