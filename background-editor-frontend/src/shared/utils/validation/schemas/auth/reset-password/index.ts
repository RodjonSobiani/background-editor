import Joi, { ObjectSchema } from 'joi';
import { IResetPasswordPort } from '@shared/interfaces/entities/user/port';
import { confirmPasswordValidation, passwordValidation } from '@shared/utils/validation/schemas/general-validations';

export const resetPasswordSchema: ObjectSchema<IResetPasswordPort> = Joi.object({
  newPassword: passwordValidation(),

  confirmNewPassword: confirmPasswordValidation('newPassword')
});
