const theoryTestController = require("./theoryTestController.js");
const {tests, testStore} = require("../store/TheoryTestsStore");
const puppeteer = require('puppeteer');
const {Login} = require("../login/login");
const {fetchTheoryTests} = require("../http/TheoryTestAPI");
const {noRawAttributes} = require("sequelize/lib/utils/deprecations");

async function getTestData(){
        try {
            const data = await fetchTheoryTests()
            return testStore.setTheoryTests(data)
        }catch (e){
            console.log(e)
        }
}




async function fillTheoryTest() {
            await getTestData()
    const browser = await puppeteer.launch({headless: false})
    await Login(browser)
    for(let i=0; i<testStore.tests.length; i++) {
        const test=testStore.tests[i]
        const page = await browser.newPage();

                    theoryTestController.openModal(page).then(() => {
                        console.log('Opened Modal')
                        theoryTestController.fillWithData(page, test).then(() => {
                            theoryTestController.submit(page).then(() => {
                                console.log('Form submited: ' + i)
                            })
                        })
                    })

    }

}




async function fillTheoryTest1() {
    await getTestData()
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage();
    await Login(page)
    for(let i=0; i<testStore.tests.length; i++) {
        const test=testStore.tests[i]
        await theoryTestController.openModal(page)
        await console.log('Opened Modal')
        await theoryTestController.fillWithData(page, test)
        await theoryTestController.submit(page)
        await console.log('Form submited: ' + i)
    }
}

module.exports.fillTheoryTest = fillTheoryTest;
