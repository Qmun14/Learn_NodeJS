import { describe, it } from '@jest/globals';
import Joi from 'joi';

describe('Joi', () => {
  it('Should return validation error', () => {
    const usernameSchema = Joi.string().min(5).email().required();

    const result = usernameSchema.validate("ups", {
      abortEarly: false,
    });
    console.log(result);

    if (result.error) {
      result.error.details.forEach(detail => {
        console.log(`${detail.path} = ${detail.message}`);
      });
    }
  });
});