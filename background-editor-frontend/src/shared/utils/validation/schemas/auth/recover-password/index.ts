import Joi, { ObjectSchema } from 'joi';
import { IRecoverPasswordPort } from '@shared/interfaces/entities/user/port';

export const recoverPasswordSchema: ObjectSchema<IRecoverPasswordPort> = Joi.object({
  email: Joi.string().email({ tlds: false }).max(255).required()
});
