const {consts} = require("../utils/consts");

class theoryTestController {



    async openModal(page) {
        try {
            await page.goto('http://localhost:3000/tests', {
                waitUntil: 'networkidle0',
            });

            await Promise.all([
                await page.click('[class="btn btn-success"]')
            ])



        } catch (error) {
            console.log(error)
        }
    }

    async fillWithData(page, test) {
        try {
            await page.type('#title', test.title);
            await page.type('#link', test.link);
            await page.type('#ResponseLink', test.responseLink);
            await page.type('#description', test.description);

        } catch (error) {
            console.log(error)
        }
    }

    async submit(page) {
        try {
            await Promise.all([
                await page.click('[class="shadow btn btn-success"]')
            ])


        } catch (error) {
            console.log(error)
        }
    }


}
module.exports = new theoryTestController();