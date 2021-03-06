import Joi from 'joi';

export default class User {
  static get userSchema() {
    return Joi.object({
      userid: Joi.number()
        .integer()
        .required(),
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
      email: Joi.string()
        .email()
        .min(5)
        .max(150)
        .trim()
        .required(),
      password: Joi.string()
        .regex(/^([a-zA-Z0-9]){8}$/)
        .required(),
      phonenumber: Joi.string()
        .trim()
        .regex(/^[0-9]{6,11}$/)
        .required(),
      gender: Joi.string().lowercase(),
    });
  }

  static get loginSchema() {
    return Joi.object({
      password: Joi.string()
        .regex(/^([a-zA-Z0-9]){8}$/)
        .required(),
      email: Joi.string()
        .email()
        .min(5)
        .max(150)
        .trim()
        .required(),
    });
  }

  static get createTripSchema() {
    return Joi.object({
      busid: Joi.number()
        .integer()
        .required(),
      origin: Joi.string()
        .trim()
        .min(3)
        .required(),
      tripdate: Joi.date()
        .format('YYYY-MM-DD')
        .required(),
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
