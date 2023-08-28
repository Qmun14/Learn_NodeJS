import { describe, it } from "@jest/globals";
import Joi, { required } from "joi";

describe('Joi', () => {
  it('should can use custom messages', () => {
    const schema = Joi.string().min(3).max(10).required().messages({
      'string.min': '{{#label}} panjang harus minimal {{#limit}} karakter',
      'string.max': '{{#label}} panjang harus maksimal {{#limit}} karakter',
    });

    const request = "aaaaaaaaaaaaaaaaa";

    const result = schema.validate(request);
    console.log(result);
  });

  it('should can use custom messages in object validation', () => {
    const schema = Joi.object({
      username: Joi.string().required().email().messages({
        'any.required': '{{#label}} harus diisi',
        'string.email': '{{#label}} harus email yang valid',

      }),
      password: Joi.string().required().min(6).max(10).messages({
        'any.required': '{{#label}} harus diisi',
        'string.min': '{{#label}} harus lebih dari {{#limit}} karakter',
        'string.max': '{{#label}} harus kurang dari {{#limit}} karakter',
      })
    });

    const request = {
      username: 'Mamun@qmun14labs.com',
      password: '1234567'
    };

    const result = schema.validate(request, {
      abortEarly: false,
    });
    console.log(result);
  })
});