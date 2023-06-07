const joi = require("joi");

//validasi register
const validate_register = (body) => {
  const registerSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(7).required(),
    confir_password: joi.ref("password"),
    phone_number: joi.string().max(15).required(),
    address: joi.string().required(),
  });

  return registerSchema.validate(body, {
    abortEarly: false,
  });
};

module.exports = validate_register;
