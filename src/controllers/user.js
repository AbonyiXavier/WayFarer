/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

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
        userid,
        firstname,
        lastname,
        email,
        phonenumber,
        password,
        gender,
      } = req.body;
      const data = {
        userid: parseInt(userid, 10),
        firstname,
        lastname,
        email,
        phonenumber,
        password,
        gender,
      };
      const result = Joi.validate(data, User.userSchema, {
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
            data.userid,
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
            const payload = {
              userid,
              firstname,
              lastname,
              phonenumber,
              hashedPassword,
              gender,
              email,
              avatar,
            };
            const token = await jwt.sign(payload, process.env.SECRETKEY);
            return res.status(201).json({
              status: 'success',
              message: 'Register successfully',
              token: `Bearer ${token}`,
              data: rows,
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
