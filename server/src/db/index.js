require("dotenv").config();

const { Pool, defaults } = require("pg");

if (process.env.NODE_ENV == "production") {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URI,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: true,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  pool.on("connect", () => console.log("Connection Successful"));
  pool.on("error", (err) => console.log(err));

  module.exports = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback);
    },
    asyncQuery: (text, params) => pool.query(text, params),
  };
}
if (process.env.NODE_ENV == "development") {
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    port: process.env.POSTGRES_PORT,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: false,
  });
  pool.on("connect", () => console.log("Connection Successful"));
  pool.on("error", (err) => console.log(err));

  module.exports = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback);
    },
    asyncQuery: (text, params) => pool.query(text, params),
  };
}
