import Joi from 'joi';

export default class Booking {
  static get bookingSchema() {
    return Joi.object({
      userid: Joi.number()
        .integer()
        .required(),
      tripid: Joi.number()
        .integer()
        .required(),
      busid: Joi.number()
        .integer()
        .required(),
      seatnumber: Joi.number()
        .integer()
        .required(),
      email: Joi.string()
        .email()
        .min(5)
        .max(150)
        .trim()
        .required(),
      tripdate: Joi.required(),
      createdon: Joi.required(),
      firstname: Joi.string()
        .min(2)
        .max(50)
        .trim()
        .required(),
      lastname: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required(),
    });
  }

  static get deleteBookingIdSchema() {
    return Joi.object({
      bookingid: Joi.number()
        .integer()
        .required(),
    });
  }
}
