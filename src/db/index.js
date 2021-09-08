require('dotenv').config();

const { Pool, defaults } = require('pg');

// console.log(`${process.env.HEROKU_DATABASE_URL}`)
// if(process.env.NODE_ENV === 'production') {
//     defaults.ssl = {
//         rejectUnauthorized: false
//     }
// }
const pool = new Pool({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // port: process.env.DB_PORT,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: true,
    ssl: {
        rejectUnauthorized: false
    }
});
pool.on('connect', ()=> console.log('Connection Successful'));
// pool.on('error', ()=> console.log(error))
pool.on('error', err => console.log(err));

// pool.connect()

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}

