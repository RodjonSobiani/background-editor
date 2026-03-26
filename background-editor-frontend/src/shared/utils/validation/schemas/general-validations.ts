import Joi from 'joi';
import { regex } from '@shared/const/regex';

export const emailValidation = () =>
  Joi.string()
    .email({ tlds: false })
    .regex(regex.email)
    .min(6)
    .max(255)
    .required()
    .error((errors) => {
      return errors.map((error) => {
        if (['string.empty', 'any.required'].includes(error.code)) error.code = 'any.empty';
        if (['string.regexp', 'string.pattern.base', 'string.email'].includes(error.code)) {
          error.code = 'any.incorrectField';
        }
        if (['string.min', 'string.max'].includes(error.code)) {
          error.code = 'any.minMax';
          error.local = { min: 6, max: 255 };
        }
        return error;
      });
    });

export const passwordValidation = () =>
  Joi.string()
    .regex(regex.password)
    .min(8)
    .max(63)
    .required()
    .error((errors) => {
      return errors.map((error) => {
        if (['string.empty', 'any.required'].includes(error.code)) error.code = 'any.empty';
        if (['string.regexp', 'string.pattern.base'].includes(error.code)) error.code = 'any.simplePassword';
        if (['string.min', 'string.max'].includes(error.code)) {
          error.code = 'any.minMax';
          error.local = { min: 8, max: 63 };
        }
        return error;
      });
    });

export const nameValidation = () =>
  Joi.string()
    .trim()
    .regex(regex.symbolsAll)
    .min(2)
    .max(127)
    .required()
    .error((errors) => {
      return errors.map((error) => {
        if (['string.empty', 'any.required'].includes(error.code)) error.code = 'any.empty';

        if (['string.regexp', 'string.pattern.base'].includes(error.code)) error.code = 'any.incorrectField';

        if (['string.min', 'string.max'].includes(error.code)) {
          error.code = 'any.minMax';
          error.local = { min: 2, max: 127 };
        }

        return error;
      });
    });

export const confirmPasswordValidation = (ref: string) =>
  Joi.string()
    .required()
    .valid(Joi.ref(ref))
    .error((errors) => {
      return errors.map((error) => {
        if (['string.empty', 'any.required'].includes(error.code)) error.code = 'any.empty';

        if (['any.only'].includes(error.code)) error.code = 'compare.password';

        if (['string.regexp', 'string.pattern.base'].includes(error.code)) error.code = 'any.incorrectField';

        if (['string.min', 'string.max'].includes(error.code)) {
          error.code = 'any.minMax';
          error.local = { min: 8, max: 63 };
        }

        return error;
      });
    });
