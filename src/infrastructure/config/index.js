const env = process.env.NODE_ENV;
const mongoTimeout = 5000;

let mongoConnectionUri = process.env.MONGO_URI || 'mongodb://admin:admin@mongo:27017/';

const run = {
  server: {
    port: process.env.PORT ||3000
  },
  mongo:{
    mongoConnectionUri,
    mongoTimeout,
    dbName: process.env.DB_NAME || 'tmp'
  },
  keepsecrets:{
    signature: process.env.JWT_KEY || 'MySuperSecret',
  }
}

const test = {
  server: {
    port: 3000
  },
  mongo:{
    mongoConnectionUri: null,
    mongoTimeout: 1,
    dbName: 'NOT EXISTS'
  },
}

const config = {
  run,
  test
}

module.exports = config[env]
