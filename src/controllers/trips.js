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
        const args = [
          data.busid,
          origin,
          destination,
          data.tripdate,
          data.fare,
          status,
        ];
        const { rows } = await db.Query(Queries.createTrip, args);
        if (rows) {
          return res.status(201).json({
            status: 201,
            message: 'Trip created successfully',
            data: rows,
          });
        }
      }
      response.errorResponse(res, 400, result.error.message);
    } catch (error) {
      /* istanbul ignore next */
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
      /* istanbul ignore next */
      console.log(error);
    }
  }

  static async cancelTrip(req, res) {
    try {
      const { id } = req.params;
      const data = {
        tripid: parseInt(id, 10),
      };

      const result = Joi.validate(data, Trip.cancelTripByIdSchema, {
        convert: false,
      });
      if (result.error === null) {
        if (req.user.isadmin === true) {
          const args = [data.id];
          const { rowCount } = await db.Query(Queries.cancelTripById, args);
          if (rowCount === 1) {
            return res.status(200).json({
              status: 'success',
              message: 'Trip cancelled successfully',
            });
          }
        } else {
          response.errorResponse(res, 401, 'Unanthorized access');
        }
      }
      response.errorResponse(res, 400, result.error.message);
    } catch (error) {
      /* istanbul ignore next */
      console.log(error);
    }
  }
}
