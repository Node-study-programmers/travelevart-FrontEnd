export type TTooltipDirection = "top" | "bottom" | "left" | "right";

export type TCheckBoxGroupDirecion = "horizontal" | "vertical";

export type TLoginWay = "kakao" | "credentials";

export interface IAuthUser {
  name: string;
  email: string;
  profileImg: string;
  userId: number;
}

export interface IAuthKaKaoUser {
  name: string;
  image: string;
}

export interface IUser {
  provider: string;
  user: IAuthUser | IAuthKaKaoUser;
}
