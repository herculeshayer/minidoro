require('dotenv').config();

const { Pool } = require('pg');


const pool = new Pool({
    // connectionString: process.env.HEROKU_DATABASE_URL,
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password:`${process.env.DB_PASSWORD}`,
    database: "minidoro",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    // ssl: {
    //     rejectUnauthorized: false
    // }

});
pool.on('connect', ()=> console.log('Connection Successful'));
// pool.on('error', ()=> console.log(error))
pool.on('error', err => console.log(err));

pool.connect

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}

