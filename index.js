const mongoose = require('mongoose')
const config = require('./config')

const env = process.env.NODE_ENV || 'development'
const servers = config.mongoHosts

const database = config.mongoDatabase || 'logs'
const replicaSet = config.mongoReplicaSet || ''
const authSource = config.mongoAuthSource || 'admin'
const authuser = config.mongoAuthUser || ''
const authpwd = config.mongoAuthPwd || ''

const combineProdctionUrl = () => {
    let uri = 'mongodb://'
    let hosts = Array.isArray(servers) ? servers : [servers]
    if (authuser && authpwd) {
        uri += `${authuser}:${authpwd}@`
    }
    hosts.forEach(host => {
        uri += `${host.host}:${host.port || 27017},`
    })

    uri = uri.substr(0, uri.length - 1)

    uri += `/${database}?replicaSet=${replicaSet}&authSource=${authSource}`
    return uri
}

const connectUri =
    env == 'development' ? `mongodb://localhost/${database}` : config.mongoUrl ? config.mongoUrl : combineProdctionUrl()

console.log('connect to uri: ' + connectUri)
mongoose
    .connect(connectUri)
    .then(() => {
        return require('./lib/mongo')
    })
    .then(() => {
        return require('./lib/redis')
    })
    .then(() => {
        return require('./lib/api/app')
    })
    .then(() => {
        console.log('micro-service log manager is ready for storing logs!')
    })
    .catch(e => {
        console.log('starting log manager has an Error: ' + e.message)
        process.exit(1)
    })
