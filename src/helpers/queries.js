export default class Queries {
  static get testQuery() {
    return 'SELECT * from users';
  }

  static get userEmail() {
    return `SELECT * from users 
    WHERE email = $1`;
  }

  static get saveNewUser() {
    return `INSERT INTO users ( userid, firstname, lastname, phonenumber, password, gender, email, avatar, isadmin) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING userid, firstname, lastname, phonenumber, password, gender, email, avatar,isadmin`;
  }

  static get createTrip() {
    return `INSERT into trips (busid, origin, destination, tripdate, fare, status)
     VALUES ($1, $2, $3, $4, $5, $6)`;
  }

  static get getAllTrips() {
    return 'SELECT * from trips';
  }

  static get cancelTripById() {
    return `UPDATE trips SET status = 'cancelled'
     WHERE id = $1`;
  }

  static get busPlateNumber() {
    return `SELECT * from buses WHERE
     platenumber = $1`;
  }

  static get bookASeat() {
    return `INSERT INTO buses (userid, tripid, busid, tripdate, seatnumber,firstname, lastname, email, createdon) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
  }

  static get registerBus() {
    return `INSERT INTO buses (platenumber, manufacturer, model, year, capacity) 
    VALUES ($1, $2, $3, $4, $5)`;
  }

  static get viewAllBookings() {
    return 'SELECT * from bookings';
  }

  static get deleteBookingById() {
    return `DELETE from bookings WHERE
     bookingid = $1`;
  }
}
