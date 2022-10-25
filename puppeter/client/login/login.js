const puppeteer = require("puppeteer");
const { store } = require("./store");
const {consts} = require("../utils/consts");


async function Login(browser) {

    const page = await browser.newPage();
    try {
        await page.goto('http://localhost:3000/login', {
            waitUntil: 'networkidle0',
        });

        await page.type('#formBasicEmail', store.EMAIL );
        await page.type('#formBasicPassword', store.PASSWORD);

        await page.screenshot({path: consts.LOGIN_SCREENSHOTS + `/filled_with_data.png`, });

        await Promise.all([
            page.waitForNetworkIdle(),
            page.click('#submitButton')
        ])
        await page.screenshot({path: consts.LOGIN_SCREENSHOTS + `/loggedin.png`, });
    } catch (error){
        console.log(error)
    }
}

module.exports.Login = Login;
