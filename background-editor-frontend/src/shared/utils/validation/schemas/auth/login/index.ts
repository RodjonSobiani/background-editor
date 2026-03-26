import Joi, { ObjectSchema } from 'joi';
import { ILoginPort } from '@shared/interfaces/entities/user/port';
import { emailValidation, passwordValidation } from '@shared/utils/validation/schemas/general-validations';

export const loginSchema: ObjectSchema<ILoginPort> = Joi.object({
  email: emailValidation(),
  password: passwordValidation()
});
