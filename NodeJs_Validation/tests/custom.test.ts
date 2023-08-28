import { describe, it } from "@jest/globals";
import Joi from "joi";

describe('Joi', () => {
  it('should can create custom validation', () => {
    const registerSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email(),
      password: Joi.string().required().min(6).max(10).custom((value, helpers) => {
        if (value.startsWith('asd')) {
          return helpers.error('password.wrong');
        }
        return value;
      }).messages({
        'password.wrong': 'password tidak boleh di awali dengan "asd"'
      }),
      confirmPassword: Joi.string().required().min(6).max(10),
    }).custom((value, helpers) => {
      if (value.password !== value.confirmPassword) {
        return helpers.error('register.password.different');
      }
      return value
    }).messages({
      'register.password.different': 'password dan confirm password tidak cocok!'
    });

    const request = {
      username: 'Mamun@qmun14labs.com',
      password: '12345asd',
      confirmPassword: 'salah12345'
    };

    const result = registerSchema.validate(request, {
      abortEarly: false
    });

    console.log(result);

  });
})