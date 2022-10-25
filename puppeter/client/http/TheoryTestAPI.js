const {$host} =  require('./index')
const {testStore} = require("../store/TheoryTestsStore");

 const fetchTheoryTests = async () => {
    const {data} = await $host.get('api/tests')
     return testStore.setTheoryTests(data)
}

const updateTheoryTestStatus = async (id, status) => {
    const {data} = await $host.patch('api/tests/status/' + id, {status})
    console.log(data.message)
    return testStore.setTheoryTests(data)
}

module.exports.updateTheoryTestStatus = updateTheoryTestStatus
module.exports.fetchTheoryTests = fetchTheoryTests