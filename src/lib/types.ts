export type TTooltipDirection = "top" | "bottom" | "left" | "right";

export type TCheckBoxGroupDirecion = "horizontal" | "vertical";

export interface IAuthUser {
  name: string;
  image: string;
}

export interface IUser {
  provider: string;
  uid: string;
  user: IAuthUser;
}
