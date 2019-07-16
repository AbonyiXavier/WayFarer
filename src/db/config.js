import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: false,
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
