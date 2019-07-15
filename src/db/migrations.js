import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pool from './config';

dotenv.config();
async function createSchema() {
  const dropTable = `DROP TABLE IF EXISTS users, buses, trips, bookings 
  CASCADE`;
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
    tripid BIGSERIAl PRIMARY KEY,
    busid INTEGER NOT NULL,
    origin VARCHAR(200) NOT NULL,
    destination VARCHAR(200) NOT NULL,
    tripdate DATE NOT NULL,
    fare INT NOT NULL,
    status VARCHAR(50) NOT NULL
)`;

  const addTripsToTable = `INSERT INTO trips ( busid, origin, destination, tripdate, fare, status) 
  VALUES ( '1', 'Abuja', 'Lagos', '2019-06-05', '8000', 'active'),
  ( '2', 'Enugu', 'Benin', '2018-04-28', '7000', 'active')`;

  const createBookingsTable = `CREATE TABLE IF NOT EXISTS bookings (
    id BIGSERIAL PRIMARY KEY,
    bookingid INTEGER NOT NULL,
    userid INTEGER NOT NULL,
    tripid INTEGER NOT NULL,
    busid INTEGER NOT NULL,
    tripdate DATE NOT NULL,
    seatnumber INTEGER NOT NULL,
    firstname VARCHAR(200) NOT NULL,
    lastname VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    createdon DATE NOT NULL
)`;
  const addBookingsToTable = `INSERT INTO bookings (bookingid, userid, tripid, busid, tripdate, seatnumber, firstname, lastname, email, createdon) 
VALUES ( '15', '2', '234', '42', '2017-03-23', '3', 'sandra', 'okafor', 'ifeomasandra@gmail.com', '2017-03-23'),
('76', '5', '411', '12', '2017-03-23','1', 'francis', 'xavier', 'xavier@yahoo.com', '2018-05-18')`;

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
