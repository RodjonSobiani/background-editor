import { IRegisterPort } from '@shared/interfaces/entities/user/port';
import Joi, { ObjectSchema } from 'joi';
import {
  confirmPasswordValidation,
  emailValidation,
  nameValidation,
  passwordValidation
} from '@shared/utils/validation/schemas/general-validations';

export const registerSchema: ObjectSchema<IRegisterPort> = Joi.object({
  name: nameValidation(),

  email: emailValidation(),

  password: passwordValidation(),

  confirmPassword: confirmPasswordValidation('password')
});
