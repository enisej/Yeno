const {$host} =  require('./index')

 const fetchTheoryTests = async () => {
    const {data} = await $host.get('api/tests')
    return data
}

module.exports.fetchTheoryTests = fetchTheoryTests