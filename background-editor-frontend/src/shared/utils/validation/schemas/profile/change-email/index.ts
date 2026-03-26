import { IChangeEmailPort } from '@shared/interfaces/entities/user/port';
import Joi, { ObjectSchema } from 'joi';
import { emailValidation, passwordValidation } from '@shared/utils/validation/schemas/general-validations';

export const changeEmailSchema: ObjectSchema<IChangeEmailPort> = Joi.object({
  password: passwordValidation(),

  email: emailValidation()
});
