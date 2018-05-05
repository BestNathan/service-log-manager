const Schema = require('mongoose').Schema

const schmea = new Schema({
    level: String,
    time: {
        type: Date,
        default: Date
    },
    content: String
})

module.exports = schmea