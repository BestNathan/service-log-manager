const mongoose = require('mongoose')

/**
 * 
 * @param {String} channel 
 * @param {String} message 
 */
module.exports = (channel, message) => {
    let modelName = channel.split('.')[1]
    let model = mongoose.getModel(modelName)
    if (model) {
        new model(JSON.parse(message)).save((err, doc) => {
            if (err) {
                console.log('log save has an Error: ' + err.message)
            }
        })
    }
}