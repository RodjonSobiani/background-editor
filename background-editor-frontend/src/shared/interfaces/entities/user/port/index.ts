interface ILoginPort {
  email: string;
  password: string;
}

interface IRegisterPort extends ILoginPort {
  name: string;
  confirmPassword: string;
}

interface IRecoverPasswordPort extends Pick<ILoginPort, 'email'> {
  link: string;
  locale: string;
}

interface IResetPasswordPort {
  newPassword: string;
  confirmNewPassword?: string;
  token: string;
}

interface IChangeNamePort {
  name: string;
}

interface IChangeEmailPort {
  email: string;
  password: string;
}

interface IUpdateAvatarPort {
  file: File | null;
}

interface IChangePasswordPort {
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

interface IRefreshTokenPort {
  refreshToken: string;
}

export type {
  IRegisterPort,
  ILoginPort,
  IRecoverPasswordPort,
  IChangeNamePort,
  IChangeEmailPort,
  IChangePasswordPort,
  IResetPasswordPort,
  IRefreshTokenPort,
  IUpdateAvatarPort
};
