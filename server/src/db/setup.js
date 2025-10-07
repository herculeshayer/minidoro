require("dotenv").config();

const { Client } = require("pg");

async function createUserTable(client) {
  try {
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
    console.log("createUserTable", result);

    console.log("Closing createUserTable connection");
  } catch (error) {
    throw error;
  }
}

async function createTestUser(client) {
  try {
    const result = await client.query(
      `insert into users (username, password, email) 
      values ('test', '123123', 'test@test.ca') 
      on conflict do nothing;`
    );
    console.log("createTestUser", result);

    console.log("Closing createTestUser connection");
  } catch (error) {
    throw error;
  }
}

async function createPomodoroTable(client) {
  try {
    const result = await client.query(
      `         create table if not exists pomodoros(
	sessionid uuid default gen_random_uuid(),
	userid uuid not null,
	pomodorocount int not null,
	sessiondate date not null,
	created_at timestamptz default current_timestamp, 
	primary key(sessionid),
	constraint fk_userid
		foreign key(userid)
			references users(userid)
);`
    );
  } catch (error) {
    throw error;
  }
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

    await client.connect();
    await createUserTable(client);
    await createTestUser(client);
    await createPomodoroTable(client);
    await client.end();
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

    await client.connect();
    await createUserTable(client);
    await createTestUser(client);
    await createPomodoroTable(client);
    await client.end();
  }
}

setup();
