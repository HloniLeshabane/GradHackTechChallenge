'use strict'
const mssql = require('mssql')

require('dotenv/config')

// Make sure this is private to this module
const config = {
    server: 'fundanamiserver.database.windows.net',
    database: 'FundaNami_db',
    // Put login details in env. variables for security
    user: process.env.db_username,
    password: process.env.db_password,
    port: 1433,
    // Required for Azure
    options: {
        encrypt: true,
        enableArithAbort: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 1000
    }
}
// Get a mssql connection instance
let isConnected = true
let connectionError = null
let pools = new mssql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to DB')
        return pool
    })
    .catch(err => {
        // Handle errors
        isConnected = false
        connectionError = err
        console.log(err)
    })
module.exports = {
    sql: mssql,
    pools: pools,
    isConnected: isConnected,
    connectionError: connectionError
}