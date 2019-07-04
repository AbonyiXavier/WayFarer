import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'wayfarerdev',
  user: 'postgres',
  password: 'futminna@24',
  ssl: false,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
pool.on('connect', () => {
  console.log(`Connected to Database ${pool}`);
});
pool.on('error', () => {
  console.log(`Error occured while connecting to ${pool.database}`);
});

export default pool;
