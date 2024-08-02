export type TTooltipDirection = "top" | "bottom" | "left" | "right";

export type TCheckBoxGroupDirecion = "horizontal" | "vertical";

export type TLoginWay = "kakao" | "credentials";

export type TFocusBoard = "여행게시판" | "자유게시판";

export interface IAuthUser {
  userId: number; // primary key
  name: string;
  email: string;
  profileImg: string;
  provider: string;
  accessToken: string;
  refreshToken: string;
  uid: string; // token.sub
}

export interface IAuthKaKaoUser {
  userId: number;
  name: string;
  profileImg: string;
  provider: string;
  accessToken: string;
  refreshToken: string;
}

// export interface IUser {
//   user: IAuthUser | IAuthKaKaoUser;
// }

export interface ICarouselContents {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  target: string;
}
