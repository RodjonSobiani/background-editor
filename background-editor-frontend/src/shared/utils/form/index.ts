import { FieldValues, FormState } from 'react-hook-form';

export const getIsDisabled = <T extends FieldValues, R>(inputs: R[], formState: FormState<T>) => {
  const allInputEmpty = !inputs.every(Boolean);
  const secondAttempt = formState.submitCount > 0 && !formState.isValid;

  return allInputEmpty || secondAttempt;
};
