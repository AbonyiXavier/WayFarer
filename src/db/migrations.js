import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pool from './config';

dotenv.config();
async function createSchema() {
  const dropTable = 'DROP TABLE IF EXISTS users';
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
  VALUES ( '14', 'jude', 'okafor', '08012345678','${hashedPassword}','male', 'okaforjudechukwuebuka@gmail.com', '//www.gravatar.com/avatar/16b7ce500621cfe1940b09d09ee42385?s=200&r=pg&d=mm', 'TRUE'),
  ( '15', 'jason', 'okafor', '08012345678','${hashedPassword}','male', 'jasonokafor@gmail.com', '//www.gravatar.com/avatar/16b7ce500621cfe1940b09d09ee42385?s=200&r=pg&d=mm', 'FALSE')`;
  const client = await pool.connect();
  try {
    await client.query(dropTable);
    await client.query(createUserTable);
    await client.query(addUserToUserTable);
  } catch (e) {
    console.log(e.stack);
  } finally {
    client.release();
  }
  return false;
}
createSchema();
