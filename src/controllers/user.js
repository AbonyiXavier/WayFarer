/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import Joi from 'joi';

import db from '../helpers/db';
import Queries from '../helpers/queries';
import User from '../models/User';

export default class userController {
  static async test(req, res) {
    try {
      const { rows } = await db.Query(Queries.testQuery);
      return res.status(200).json({
        message: 'Test works',
        data: rows,
      });
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  static async signUp(req, res) {
    try {
      const {
        email,
        firstname,
        lastname,
        phonenumber,
        password,
        gender,
      } = req.body;
      const result = Joi.validate(req.body, User.userSchema, {
        convert: false,
      });
      if (result.error === null) {
        const arg = [email];
        const { rowCount } = await db.Query(Queries.userEmail, arg);
        if (rowCount === 0) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hashSync(password, salt);
          const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
          });
          const args = [
            firstname,
            lastname,
            phonenumber,
            hashedPassword,
            gender,
            email,
            avatar,
            'FALSE',
          ];
          const { rows } = await db.Query(Queries.saveNewUser, args);
          if (rows) {
            return res.status(201).json({
              status: 201,
              message: 'Register successfully',
            });
          }
        } else {
          return res
            .status(404)
            .json({ status: 404, message: 'User already exist' });
        }
      } else {
        return res
          .status(400)
          .json({ status: 'error', message: result.error.message });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
