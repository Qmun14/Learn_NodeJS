import { describe, it } from '@jest/globals';
import Joi from 'joi'

describe('Joi', () => {
  it('should can create schema', () => {
    const schema = Joi.string().min(3).max(100).required();

    const result = schema.validate("Mamun");
    if (result.error) {
      console.log(result.error);
    };
  });

  it('should can validate basic data types', () => {
    const usernameSchema = Joi.string().email().required();
    const isAdminSchema = Joi.boolean().required();
    const priceSchema = Joi.number().required().min(1000).max(1000000);

    const resultUsername = usernameSchema.validate('Mamun@gmail.com');
    console.log(resultUsername);

    const resultIsAdmin = isAdminSchema.validate('true');
    console.log(resultIsAdmin);

    console.log(typeof 'true');
    console.log(typeof resultIsAdmin.value);
    console.log(typeof resultIsAdmin.error);

    const resultPrice = priceSchema.validate("10000")
    console.log(resultPrice);
  })

});