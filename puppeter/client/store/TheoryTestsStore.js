

class testStore {

    constructor() {
        this._theoryTest = {

        }
    }

    setTheoryTests(test) {
        this._theoryTest = test
    }

    get tests() {
        return this._theoryTest
    }





}

 const tests = [
        {
            title : "hello",
            link : "https://dfsdfs.com/sdahh",
            responseLink : "https://dfsdfs.com/sdahh",
            description : "asdgaskjdgasfjksghdfklsdhfjksdfhksjdfh"
        },
        {
            title : "hello",
            link : "https://dfsdfs.com/sdaasda",
            responseLink : "https://dfsdfs.com/sdaasda",
            description : "asdgaskjdgasfjksghdfklsdhfjksdfhksjdfh"
        },
        {
            title : "hello",
            link : "https://dfsdfs.com/sdajj",
            responseLink : "https://dfsdfs.com/sdakk",
            description : "asdgaskjdgasfjksghdfklsdhfjksdfhksjdfh"
        },
        {
            title : "hello",
            link : "https://dfsdfs.com/sdall",
            responseLink : "https://dfsdfs.com/sdajjh",
            description : "asdgaskjdgasfjksghdfklsdhfjksdfhksjdfh"
        }
    ]

module.exports.tests = tests
module.exports.testStore = new testStore()