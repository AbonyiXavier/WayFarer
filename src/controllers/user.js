/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

import db from '../helpers/db';
import Queries from '../helpers/queries';
import response from '../helpers/response';
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
            response.errorResponse(res, 201, 'Register successfully');
          }
        } else {
          response.errorResponse(res, 404, 'User already exist');
        }
      } else {
        response.errorResponse(res, 400, result.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const result = Joi.validate(req.body, User.loginSchema, {
        convert: false,
      });
      if (result.error === null) {
        const arg = [email];
        const { rows, rowCount } = await db.Query(Queries.userEmail, arg);
        if (rowCount === 1) {
          const isMatch = await bcrypt.compareSync(password, rows[0].password);
          if (isMatch) {
            const payload = {
              email: rows[0].email,
              isAdmin: rows[0].isAdmin,
            };
            const token = await jwt.sign(payload, process.env.SECRETKEY);
            return res.status(201).json({
              status: 201,
              message: 'Login success',
              token: `Bearer ${token}`,
            });
          }
          response.errorResponse(res, 400, 'Password incorrect');
        }
        response.errorResponse(res, 404, 'User does not exist');
      }
      response.errorResponse(res, 400, result.error.message);
    } catch (error) {
      console.log(error);
    }
  }
}
