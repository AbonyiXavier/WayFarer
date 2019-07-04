import db from '../helpers/db';
import queries from '../helpers/queries';

export default class userController {
  static async test(req, res) {
    try {
      const { rows } = await db.Query(queries.testQuery);
      console.log(rows);
      return res.status(200).json({
        message: 'Test works',
      });
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  static signIn(req, res) {
    return false;
  }
}
