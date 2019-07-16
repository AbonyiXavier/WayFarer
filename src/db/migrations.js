import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pool from './config';

dotenv.config();
async function createSchema() {
  const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL,
    userid INTEGER NOT NULL,
    firstname VARCHAR(200) NOT NULL,
    lastname VARCHAR(200) NOT NULL,
    phonenumber VARCHAR(200) NOT NULL,
    password VARCHAR(500) NOT NULL,
    gender VARCHAR(30),
    email VARCHAR(200) UNIQUE NOT NULL,
    avatar VARCHAR(500),
    isadmin BOOLEAN
  )`;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync('password', salt);

  const client = await pool.connect();
  try {
    await client.query(dropTable);
    await client.query(createUserTable);
    await client.query(addUserToUserTable);
    await client.query(createBusTable);
    await client.query(addBusToTable);
    await client.query(createTripsTable);
    await client.query(addTripsToTable);
    await client.query(createBookingsTable);
    await client.query(addBookingsToTable);
  } catch (e) {
    console.log(e.stack);
  } finally {
    client.release();
  }
  return false;
}
createSchema();
