const puppeteer = require("puppeteer");
const { store } = require("./store");

class theoryTestController {

    async openModal(page) {
        try {
            await page.goto('http://localhost:3000/tests', {
                waitUntil: 'networkidle0',
            });

            await Promise.all([
                await page.click('[class="btn btn-success"]')
            ])

            await page.screenshot({path: 'screenshots/modal.png'});

        } catch (error) {
            console.log(error)
        }
    }

    async fillWithData(page) {
        try {

            await page.type('#title', store.TITLE);
            await page.type('#link', store.LINK);
            await page.type('#ResponseLink', store.RESPONSE_LINK);
            await page.type('#description', store.DESCRIPTION);



            await page.screenshot({path: 'screenshots/test.png'});

        } catch (error) {
            console.log(error)
        }
    }

    async submit(page) {
        try {
            await Promise.all([
                await page.click('[class="shadow btn btn-success"]')
            ])
            await page.screenshot({path: 'screenshots/submit.png'});
        } catch (error) {
            console.log(error)
        }
    }


}
module.exports = new theoryTestController();