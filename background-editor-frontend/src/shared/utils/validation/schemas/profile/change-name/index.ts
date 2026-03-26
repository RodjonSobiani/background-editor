import { IChangeEmailPort } from '@shared/interfaces/entities/user/port';
import Joi, { ObjectSchema } from 'joi';
import { nameValidation } from '@shared/utils/validation/schemas/general-validations';

export const changeNameSchema: ObjectSchema<IChangeEmailPort> = Joi.object({
  name: nameValidation()
});
