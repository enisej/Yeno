const theoryTestController = require("./theoryTestController.js");

async function theoryTest(page) {

    theoryTestController.openModal(page).then(() => {
        console.log('Opened Modal')
        theoryTestController.fillWithData(page).then( () => {
            theoryTestController.submit(page).then(() => {
                console.log('Form submited')
            })


        })

    })

}

module.exports.theoryTest = theoryTest;