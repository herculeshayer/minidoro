// const db = require("./index");

/**
 * TODO:
 * 
 * This file should be called a single time up on build
 * It will drop any tables called users and then create 
 * a table called users -- atm a table is created inside db/index.js
 */

// const setup = () => {
//     console.log('setup file');
//     db.asyncQuery(`CREATE TABLE IF NOT EXISTS users (
//         user_id serial PRIMARY KEY,
//         username VARCHAR(50) UNIQUE NOT NULL,
//         password VARCHAR(50) NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         created_at TIMESTAMP DEFAULT
//     )`,[], (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log(result);
//         }
//     });
// }

// module.exports = setup;