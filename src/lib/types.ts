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
  startDay: string;
  endDay: string;
  title: string;
  region: string;
  image: string;
}

export interface IFestival {
  id: number;
  startDay: string;
  endDay: string;
  title: string;
  region: string;
  image: string;
  summary: string;
  detailInfo: string;
  eventInfo: string;
  tel: string;
  address: string;
  eventAddress: string;
  site: string;
  price: string;
  host: string;
  viewCount: number;
}

export interface IGetFestivalResponse {
  item: IFestival | null;
}

// 커스텀하기 데이터 타입

export interface ITravelDetail {
  id: number;
  place_id: number;
  routeIndex: number;
  playTime: string;
  contents: string;
  transportOption: string;
  starting_point: string;
  region_id: number;
  detailtravel_image: string;
  address: string;
  placeTitle: string;
  placeImage: string;
  day: number;
  mapLink: string;
  accommodation_day: number;
  accommodation_address: string;
  accommodation_title: string;
  accommodation_reservationLink: string;
}

export interface ITravelItem {
  date: string;
  details: ITravelDetail[];
}

export interface ITravelCustomData {
  travel_name: string;
  travelroute_range: number;
  start_date: string;
  end_date: string;
}

export interface ITravelResponse {
  items: ITravelItem[];
}
