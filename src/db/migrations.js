import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pool from './config';

dotenv.config();
async function createSchema() {
  const dropTable = 'DROP TABLE IF EXISTS users, buses, trips CASCADE';
  const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    userid BIGSERIAL PRIMARY KEY UNIQUE NOT NULL,
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
  const addUserToUserTable = `INSERT INTO users (firstname, lastname, phonenumber, password, gender, email, avatar, isadmin) 
  VALUES ('jude', 'okafor', '08012345678','${hashedPassword}','male', 'okaforjudechukwuebuka@gmail.com', '//www.gravatar.com/avatar/16b7ce500621cfe1940b09d09ee42385?s=200&r=pg&d=mm', 'TRUE'),
  ('jason', 'okafor', '08012345678','${hashedPassword}','male', 'jasonokafor@gmail.com', '//www.gravatar.com/avatar/16b7ce500621cfe1940b09d09ee42385?s=200&r=pg&d=mm', 'FALSE')`;

  const createBusTable = `CREATE TABLE IF NOT EXISTS buses (
    id BIGSERIAl PRIMARY KEY,
    platenumber VARCHAR(200) NOT NULL,
    model VARCHAR(200) NOT NULL,
    manufacturer VARCHAR(200) NOT NULL,
    year INT NOT NULL,
    capacity INT NOT NULL
    )`;
  const addBusToTable = `INSERT INTO buses ( platenumber, model, manufacturer, year, capacity) 
    VALUES ( 'GN804-PJA', 'Toyota', 'Toyota Motor Corporation', '2015', '18'),
    ( 'HUN3D', 'Nv350', 'Nissan', '2012', '30')`;

  const createTripsTable = `CREATE TABLE IF NOT EXISTS trips (
    id BIGSERIAl PRIMARY KEY,
    busid INTEGER NOT NULL,
    origin VARCHAR(200) NOT NULL,
    destination VARCHAR(200) NOT NULL,
    tripdate DATE NOT NULL,
    fare INT NOT NULL,
    status VARCHAR(50) NOT NULL
)`;

  const addTripsToTable = `INSERT INTO trips (busid, origin, destination, tripdate, fare, status) 
  VALUES ( '20', 'Abuja', 'Lagos', '2019-06-05', '8000', 'active'),
  ('54', 'Enugu', 'Benin', '2018-04-28', '7000', 'active')`;

  const client = await pool.connect();
  try {
    await client.query(dropTable);
    await client.query(createUserTable);
    await client.query(addUserToUserTable);
    await client.query(createBusTable);
    await client.query(addBusToTable);
    await client.query(createTripsTable);
    await client.query(addTripsToTable);
  } catch (e) {
    console.log(e.stack);
  } finally {
    client.release();
  }
  return false;
}
createSchema();
