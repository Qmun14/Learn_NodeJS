import { describe, it } from "@jest/globals";
import Joi from "joi";

describe('Joi', () => {
  it('should can validate date', () => {
    const birthDateScema = Joi.date().required().max("now").min("1-1-1991");

    const result = birthDateScema.validate('1-1-1990');
    console.log(result);
    console.log(typeof result.value); //? Date
    console.log(typeof result.error); //? ValidationError

    const result2 = birthDateScema.validate('4-14-1991');
    console.log(result2);

    const result3 = birthDateScema.validate('4-14-2024');
    console.log(result3);

  });
})