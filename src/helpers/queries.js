export default class Queries {
  static get testQuery() {
    return 'SELECT * from users';
  }

  static get userEmail() {
    return `SELECT * from users 
    WHERE email = $1`;
  }

  static get saveNewUser() {
    return `INSERT INTO users (firstname, lastname, phonenumber, password, gender, email, avatar,isadmin) 
    VALUES ($1, $2, $3,$4,$5, $6, $7, $8)`;
  }

  static get createTrip() {
    return `INSERT into trips ( tripid, busid, origin, destination, tripdate, fare, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  }

  static get getAllTrips() {
    return 'SELECT * from trips';
  }

  static get busPlateNumber() {
    return `SELECT * from buses WHERE
     platenumber = $1`;
  }

  static get bookASeat() {
    return `INSERT into bookings (bookingid, userid, tripid, busid, tripdate, seatnumber, firstname, lastname, email, createdon)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING bookingid, userid, tripid, busid, tripdate, seatnumber, firstname, lastname, email, createdon`;
  }

  static get registerBus() {
    return `INSERT INTO buses (platenumber, manufacturer, model, year, capacity) 
    VALUES ($1, $2, $3, $4, $5)`;
  }
}
