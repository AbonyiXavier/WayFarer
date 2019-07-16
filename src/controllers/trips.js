/* eslint-disable consistent-return */
import Joi from 'joi';
import jwt from 'jsonwebtoken';

import db from '../helpers/db';
import Queries from '../helpers/queries';
import response from '../helpers/response';
import Trip from '../models/Trip';

export default class tripController {
  static async createTrip(req, res) {
    try {
      const {
        tripid,
        busid,
        origin,
        destination,
        tripdate,
        fare,
        status,
      } = req.body;
      const data = {
        tripid: parseInt(tripid, 10),
        busid: parseInt(busid, 10),
        origin,
        destination,
        tripdate,
        fare: parseInt(fare, 10),
        status,
      };
      const result = Joi.validate(data, Trip.createTripSchema, {
        convert: false,
      });
      if (result.error === null) {

        }
      }
      response.errorResponse(res, 400, result.error.message);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllTrips(req, res) {
    try {
      const { rows } = await db.Query(Queries.getAllTrips);
      return res.status(200).json({
        message: 'success',
        data: rows,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
