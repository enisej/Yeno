const axios = require('axios')

const $host = axios.create({
    baseURL: 'http://localhost:5001/'
})

module.exports =  {
    $host,
}