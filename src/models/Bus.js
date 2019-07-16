import Joi from 'joi';

export default class Bus {
  static get registerBusSchema() {
    return Joi.object({
      platenumber: Joi.string()
        .trim()
        .required(),
      manufacturer: Joi.string().required(),
      model: Joi.string()
        .trim()
        .required(),
      year: Joi.number()
        .integer()
        .min(2000)
        .max(new Date().getFullYear())
        .required(),
      capacity: Joi.number().required(),
    });
  }
}
