require("dotenv").config();

const { Client } = require("pg");

async function createUserTable(client) {
  await client.connect(() => console.log("Connection Successful"));

  const result = await client.query(
    `create table if not exists users(
    userid uuid default gen_random_uuid(),
    username varchar(50) unique not null,
    password varchar(255) not null,
    email varchar(255) unique not null,
    created_at timestamp default current_timestamp,
    primary key (userid)
  );`
  );
  console.log(result);

  await client.end();
  console.log("Closing Connection");
}

async function setup() {
  console.log("Running PSQL Setup Script");

  if (process.env.NODE_ENV == "production") {
    console.log("Environment set to Production");

    const client = new Client({
      connectionString: process.env.DATABASE_URI,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      ssl: true,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    createUserTable(client);
  }

  if (process.env.NODE_ENV == "development") {
    console.log("Environment set to Development");

    const client = new Client({
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DB,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      ssl: false,
    });
    createUserTable(client);
  }
}

setup();
