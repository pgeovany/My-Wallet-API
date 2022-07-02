import joi from "joi";

const singupSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const singinSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export { singupSchema, singinSchema };
