import joi from "joi";

const singupSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  passwordConfirmation: joi.string().valid(joi.ref("password")).required(),
});

export default singupSchema;