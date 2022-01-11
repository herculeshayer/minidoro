require('dotenv').config();

const { Pool, defaults } = require('pg');
/*
    Convoluted method of using a production DB
    and a local dev DB... but it works and im going to use it 
*/

// if(process.env.NODE_ENV == 'development') {
//     console.log('from development db');
    
// }
if(process.env.NODE_ENV == 'production') {
    const pool = new Pool({
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
   
    pool.on('error', err => console.log(err));



    module.exports = {
        query: (text, params, callback) => {
            return pool.query(text, params, callback)
        },
        asyncQuery: (text, params) => pool.query(text, params),
    }

} else {
    const pool = new Pool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        ssl: false,
    });
    pool.on('connect', ()=> console.log('Connection Successful'));
    pool.on('error', err => console.log(err));

    module.exports = {
        query: (text, params, callback) => {
            return pool.query(text, params, callback)
        },
        asyncQuery: (text, params) => pool.query(text, params),
    }
}


