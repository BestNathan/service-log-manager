const mongoose = require('mongoose')

const env = process.env.NODE_ENV || 'development'
const host = 'api.bestnathan.net'
const ports = [30001, 30002, 30003]
const database = 'logs'
const replicaSet = 'rs'
const authSource = 'admin'
const authuser = 'nathan'
const authpwd = 'zhangdage'

const combineProdctionUrl = () => {
    let uri = 'mongodb://'
    let port = Array.isArray(ports) ? ports : [ports]
    if (authuser && authpwd) {
        uri += `${authuser}:${authpwd}@`
    }
    port.forEach(p => {
        uri += `${host}:${p},`
    })

    uri = uri.substr(0, uri.length - 1)

    uri += `/${database}?replicaSet=${replicaSet}&authSource=${authSource}`
    return uri
}

const connectUri = env == 'development' ? `mongodb://localhost/${database}` : combineProdctionUrl()

mongoose.connect(connectUri).then(() => {
    return require('./lib/mongo')
}).then(() => {
    return require('./lib/redis')
}).then(() => {
    return require('./lib/api/app')
}).then(() => {
    console.log('micro-service log manager is ready for storing logs!')
}).catch(e => {
    console.log('starting log manager has an Error: ' + e.message)
    process.exit(1)
})