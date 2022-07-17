import joi from "joi";

const TWO_DECIMAL_PLACES = 2;

const singupSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const singinSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const transactionSchema = joi.object({
  type: joi.string().valid("credit", "debit").required(),
  date: joi.string().required(),
  value: joi.number().positive().precision(TWO_DECIMAL_PLACES).required(),
  description: joi.string().required(),
});

export { singupSchema, singinSchema, transactionSchema };
