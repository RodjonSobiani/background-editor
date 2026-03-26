import { IChangePasswordPort } from '@shared/interfaces/entities/user/port';
import Joi, { ObjectSchema } from 'joi';
import { confirmPasswordValidation, passwordValidation } from '@shared/utils/validation/schemas/general-validations';

export const changePasswordSchema: ObjectSchema<IChangePasswordPort> = Joi.object({
  currentPassword: passwordValidation(),

  newPassword: passwordValidation(),

  confirmPassword: confirmPasswordValidation('newPassword')
});
