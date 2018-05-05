const mongoose = require('mongoose')
const schema = require('./logSchema')

mongoose.getModel = name => {
    let model = mongoose.models[name]
    if (model) {
        return model
    }

    model = mongoose.model(name, schema, name)
    return model
}