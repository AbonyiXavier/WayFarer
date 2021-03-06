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
  }

  static get getAllTrips() {
    return 'SELECT * from trips';
  }

  static get busPlateNumber() {
    return `SELECT * from buses WHERE
     platenumber = $1`;
  }

  static get bookASeat() {

  }

  static get registerBus() {
    return `INSERT INTO buses (platenumber, manufacturer, model, year, capacity) 
    VALUES ($1, $2, $3, $4, $5)`;
  }
}
