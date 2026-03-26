import React, { InputHTMLAttributes, ReactElement } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

export interface ITextAreaControlledProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends InputHTMLAttributes<HTMLTextAreaElement> {
  control: Control<TFieldValues>;
  label: string;
  className?: string;
  icon?: ReactElement;
  name: TName;
}

export const TextAreaControlled = <T extends FieldValues>({
  control,
  name,
  label,
  className = '',
  disabled,
  ...props
}: ITextAreaControlledProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="flex flex-col gap-[4px]">
          <label
            className={`body-12px-golos-medium ${disabled ? 'text-disabled-dark' : error ? 'text-error' : 'text-secondary'}`}>
            {label}
          </label>
          <textarea
            {...props}
            rows={3}
            value={value ?? ''}
            onChange={onChange}
            disabled={disabled}
            className={`${disabled ? 'text-disabled-dark border-disabled-dark bg-disabled-light' : `hover:border-dark-gray ${error ? 'focus-visible:outline-error border-error' : 'focus-visible:outline-dark-gray border-border'}`} body-14px-golos-regular no-scrollbar h-full w-full resize-none rounded-[8px] border p-[16px] transition-all ${className}`}
          />
          <div className="h-[0px]">
            {error?.message && <p className="text-error body-10px-golos-regular">{error.message}</p>}
          </div>
        </div>
      )}
    />
  );
};
