const puppeteer = require("puppeteer");
const { store } = require("./store");


async function Login(page) {
    try {
        await page.goto('http://localhost:3000/login', {
            waitUntil: 'networkidle0',
        });

        await page.type('#formBasicEmail', store.EMAIL );
        await page.type('#formBasicPassword', store.PASSWORD);

        await Promise.all([
            page.waitForNetworkIdle(),
            page.click('#submitButton')
        ])
        await page.screenshot({path: 'screenshots/login.png'});
    } catch (error){
        console.log(error)
    }
}

module.exports.Login = Login;
