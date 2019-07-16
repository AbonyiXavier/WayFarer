/* eslint-disable consistent-return */
import Joi from 'joi';

import db from '../helpers/db';
import Queries from '../helpers/queries';
import response from '../helpers/response';
import Booking from '../models/Booking';

export default class bookingController {
  static async bookASeatOnATrip(req, res) {
    try {
      const {
        userid,
        tripid,
        busid,
        tripdate,
        seatnumber,
        firstname,
        lastname,
        email,
        createdon,
      } = req.body;
      const data = {
        userid: parseInt(userid, 10),
        busid: parseInt(busid, 10),
        tripid: parseInt(tripid, 10),
        tripdate,
        seatnumber: parseInt(seatnumber, 10),
        firstname,
        lastname,
        email,
        createdon,
      };
      const result = Joi.validate(data, Booking.bookingSchema, {
        convert: false,
      });
      if (result.error === null) {
        const args = [
          data.userid,
          data.tripid,
          data.busid,
          tripdate,
          data.seatnumber,
          firstname,
          lastname,
          email,
          createdon,
        ];
        const { rows } = await db.Query(Queries.bookASeat, args);
        if (rows) {
          return res.status(201).json({
            status: 'success',
            data: rows,
          });
        }
      }
      response.errorResponse(res, 400, result.error.message);
    } catch (error) {
      console.log(error);
    }
  }

  static async viewAllBookings(req, res) {
    try {
      const { rows } = await db.Query(Queries.viewAllBookings);
      return res.status(200).json({
        message: 'success',
        data: rows,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteBookingById(req, res) {
    try {
      const { bookingid } = req.body;
      const data = {
        bookingid: parseInt(bookingid, 10),
      };

      const result = Joi.validate(data, Booking.deleteBookingIdSchema, {
        convert: false,
      });
      if (result.error === null) {
        const args = [data.bookingid];
        const { rowCount } = await db.Query(Queries.deleteBookingById, args);
        if (rowCount === 1) {
          return res.status(200).json({
            status: 'success',
            message: 'Booking deleted successfully',
          });
        }
        response.errorResponse(
          res,
          400,
          'Could not delete booking because it was not found',
        );
      }
      response.errorResponse(res, 400, result.error.message);
    } catch (error) {
      console.log(error);
    }
  }
}
