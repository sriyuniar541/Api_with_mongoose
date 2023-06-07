const joi = require("joi");

//validasi register
const validate_products = (body) => {
  const registerSchema = joi.object({
    name : joi.string().min(3).required(),
    price : joi.number().required(),
    count : joi.number().required(),
  });

  return registerSchema.validate(body, {
    abortEarly: false,
  });
};

module.exports = validate_products;
