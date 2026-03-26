interface IId {
  id: string;
}

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

interface IUser extends IId {
  email: string;
  name: string;
  avatar?: string;
}

interface IRegisterDto {
  email: string;
  name: string;
}

interface ILoginDto extends ITokens {
  user: IUser;
}

interface IGetMeDto extends IUser {
  created_at: string;
}

type IChangeNameDto = ITokens;

type IChangeEmailDto = ITokens;

type IChangePasswordDto = ITokens;

type IRefreshTokenDto = ITokens;

interface IHistoryDto {
  id: string;
  image_id: string;
  image: string;
  created_at: string;
  working_area_id: string;
}

export type {
  IRegisterDto,
  ILoginDto,
  IGetMeDto,
  IChangeNameDto,
  IChangeEmailDto,
  IChangePasswordDto,
  IRefreshTokenDto,
  ITokens,
  IHistoryDto
};
