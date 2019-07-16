/* eslint-disable consistent-return */
import Joi from 'joi';

import db from '../helpers/db';
import Queries from '../helpers/queries';
import response from '../helpers/response';
import Bus from '../models/Bus';

export default class busController {
  static async registerBus(req, res) {
    try {
      const {
        platenumber, model, manufacturer, year, capacity,
      } = req.body;
      const data = {
        platenumber,
        model,
        manufacturer,
        year: parseInt(year, 10),
        capacity: parseInt(capacity, 10),
      };
      const result = Joi.validate(data, Bus.registerBusSchema, {
        convert: false,
      });
      if (result.error === null) {
        const arg = [platenumber];
        const { rowCount } = await db.Query(Queries.busPlateNumber, arg);
        if (rowCount === 1) {
          response.errorResponse(res, 400, 'Bus already exist');
        }
        const args = [
          platenumber,
          model,
          manufacturer,
          data.year,
          data.capacity,
        ];
        const { rows } = await db.Query(Queries.registerBus, args);
        if (rows) {
          return res.status(201).json({
            status: 'success',
            message: 'Bus registered succesfully',
            data: rows[0],
          });
        }
      }
      response.errorResponse(res, 400, result.error.message);
    } catch (error) {
      console.log(error);
    }
  }
}
