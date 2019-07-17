import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

let connectionString;
let ssl;
if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.PGLOCAL;
  ssl = false;
} else {
  connectionString = process.env.DATABASE_URL;
  ssl = true;
}

const pool = new Pool({
  connectionString,
  ssl,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
pool.on('connect', () => {
  console.log(`Connected to Database ${process.env.PGDATABASE}`);
});
pool.on('error', () => {
  console.log(`Error occured while connecting to ${process.env.PGDATABASE}`);
});

export default pool;
