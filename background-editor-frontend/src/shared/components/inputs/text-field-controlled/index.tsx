import { mdiEmail, mdiEye, mdiEyeOff } from '@mdi/js';
import Icon from '@mdi/react';
import { InputHTMLAttributes, useState } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

const IconPasswordView = ({
  error = false,
  disabled,
  isVisible,
  onChangeVisible
}: {
  error?: boolean;
  disabled?: boolean;
  isVisible: boolean;
  onChangeVisible: (event: React.MouseEvent<HTMLDivElement>) => void;
}) => (
  <div onClick={onChangeVisible} className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-[16px]">
    <Icon
      size="20px"
      path={isVisible ? mdiEyeOff : mdiEye}
      className={disabled ? 'text-disabled-dark' : error ? 'text-error' : 'text-icon'}
    />
  </div>
);

const IconView = ({ iconPath, error = false, disabled }: { iconPath: string; error?: boolean; disabled?: boolean }) => (
  <div className="absolute inset-y-0 right-0 flex items-center pr-[16px]">
    <Icon
      size="20px"
      path={iconPath}
      className={disabled ? 'text-disabled-dark' : error ? 'text-error' : 'text-icon'}
    />
  </div>
);

export interface ITextFieldControlledProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<TFieldValues>;
  label: string;
  className?: string;
  iconPath?: string | null;
  name: TName;
}

export const TextFieldControlled = <T extends FieldValues>({
  label,
  className = '',
  iconPath,
  type,
  name,
  control,
  disabled,
  ...props
}: ITextFieldControlledProps<T>) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  const renderIcon = (error?: boolean) => {
    if (iconPath === null) return null;

    if (iconPath) return <IconView iconPath={iconPath} disabled={disabled} error={error} />;

    if (type === 'password') {
      return (
        <IconPasswordView
          error={error}
          disabled={disabled}
          isVisible={isPasswordVisible}
          onChangeVisible={togglePasswordVisibility}
        />
      );
    }

    if (name === 'email') return <IconView iconPath={mdiEmail} disabled={disabled} error={error} />;

    return null;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const icon = renderIcon(!!error);
        return (
          <div className="flex flex-col gap-[4px]">
            <label
              className={`body-12px-golos-medium ${disabled ? 'text-disabled-dark' : error ? 'text-error' : 'text-secondary'}`}>
              {label}
            </label>
            <div className="relative">
              <div
                className={`${disabled ? 'border-disabled-dark bg-disabled-light' : `hover:border-dark-gray ${error ? 'border-error' : 'border-border'}`} rounded-[8px] border transition-all outline-none`}>
                <input
                  {...props}
                  type={inputType}
                  value={value ?? ''}
                  onChange={onChange}
                  disabled={disabled}
                  className={`${disabled ? 'text-disabled-dark' : error ? 'focus-visible:outline-error' : 'focus-visible:outline-dark-gray'} body-14px-golos-regular h-[48px] w-full border border-none p-[16px] ${icon !== null ? 'pr-[48px]' : ''} focus-visible:rounded-[8px] ${className}`}
                />
              </div>
              {icon}
            </div>
            <div className="h-[0px]">
              {error?.message && <p className="text-error body-10px-golos-regular">{error?.message}</p>}
            </div>
          </div>
        );
      }}
    />
  );
};
