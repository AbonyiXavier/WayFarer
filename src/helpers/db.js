import pool from '../db/config';
export default class DbHelpers {
  static async Query(query, args) {
    const client = await pool.connect();
    try {
      const result = await client.query(query, args);
      return result;
    } catch (e) {
      console.log(e.stack);
    } finally {
      client.release();
    }
    return false;
  }
}
