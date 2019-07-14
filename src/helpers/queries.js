export default class Queries {
  static get testQuery() {
    return 'SELECT * from users';
  }

  static get userEmail() {
    return `SELECT * from users 
    WHERE email = $1 RETURNING userid`;
  }

  static get saveNewUser() {
    return `INSERT INTO users (firstname, lastname, phonenumber, password, gender, email, avatar,isadmin) 
    VALUES ($1, $2, $3,$4,$5, $6, $7, $8)`;
  }
}
