import Joi, { ObjectSchema } from 'joi';
import { IContactUsPort } from '@shared/api/contact-us';
import { emailValidation, nameValidation } from '@shared/utils/validation/schemas/general-validations';

export const contactUsSchema: ObjectSchema<IContactUsPort> = Joi.object({
  name: nameValidation(),
  email: emailValidation(),
  question: Joi.string()
    .min(5)
    .max(1024)
    .required()
    .error((errors) => {
      return errors.map((error) => {
        if (['string.empty', 'any.required'].includes(error.code)) error.code = 'any.empty';
        if (['string.pattern.base'].includes(error.code)) {
          error.code = 'any.incorrectField';
        }
        if (['string.min', 'string.max'].includes(error.code)) {
          error.code = 'any.minMax';
          error.local = { min: 6, max: 255 };
        }
        return error;
      });
    })
});
