/* eslint-disable consistent-return */
import Joi from 'joi';

import db from '../helpers/db';
import Queries from '../helpers/queries';
import response from '../helpers/response';
import Trip from '../models/Trip';

export default class tripController {
  static async createTrip(req, res) {
    try {
      const {
        busid, origin, destination, tripdate, fare, status,
      } = req.body;
      const data = {
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
        if (req.user.isadmin === true) {
          const args = [
            data.busid,
            origin,
            destination,
            tripdate,
            data.fare,
            status,
          ];
          const { rows } = await db.Query(Queries.createTrip, args);
          if (rows) {
            return res.status(201).json({
              status: 'success',
              data: rows,
            });
          }
        } else {
          response.errorResponse(res, 400, 'Trip exist');
        }
      }
      response.errorResponse(res, 400, result.error.message);
    } catch (error) {
      console.log(error);
    }
  }
}
