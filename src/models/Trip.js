import Joi from 'joi';

export default class Trip {
  static get createTripSchema() {
    return Joi.object({
      busid: Joi.number()
        .integer()
        .required(),
      origin: Joi.string()
        .trim()
        .min(3)
        .required(),
      tripdate: Joi.required(),
      destination: Joi.string()
        .trim()
        .min(3)
        .required(),
      fare: Joi.number().required(),
      status: Joi.string()
        .trim()
        .valid('active', 'cancelled'),
    });
  }
}
