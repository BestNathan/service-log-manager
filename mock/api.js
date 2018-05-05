const axios = require('axios')

axios
    .post('http://localhost:3000/log/mock', {
        level: 'info',
        content: 'hahaha'
    })
    .then(a => {
        console.log(a.data)
    })
    .catch(e => {
        console.log(e.message)
    })
