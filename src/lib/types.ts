export type TTooltipDirection = "top" | "bottom" | "left" | "right";

export type TCheckBoxGroupDirecion = "horizontal" | "vertical";

export type TLoginWay = "kakao" | "credentials";

export interface IAuthUser {
  email: string;
  name: string;
  profileImg: string;
  userId: number;
  accessToken: string;
  refreshToken: string;
  provider: string;
}

export interface IAuthKaKaoUser {
  name: string;
  profileImg: string;
  userId: string;
  provider: string;
}

export interface IUser {
  provider: string;
  user: IAuthUser | IAuthKaKaoUser;
}
