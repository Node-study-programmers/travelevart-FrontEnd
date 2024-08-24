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
  detailtravelId: number;
  travelrouteId: number;
  placeId: number;
  routeIndex: number;
  contents: string;
  regionId: number;
  address: string;
  placeTitle: string;
  placeImage: string;
  mapLink: string | null;
}

export interface ITravelItem {
  date: string;
  details: ITravelDetail[];
}

export interface ITravelCustomData {
  travelRouteName: string;
  travelRouteRange: number;
  startDate: string;
  endDate: string;
  travelRouteId: number | null;
  travelRouteTransport: string;
}

export interface ITravelResponse {
  items: ITravelItem[];
}

export type IUserSaveData = {
  cartId: number;
  place: {
    address: string;
    event: number;
    image: string | null;
    placeId: number;
    title: string;
  };
}[];

// recommend-trip
export type TTransportation = "public" | "car";

export interface ISelectedRegion {
  id: number;
  region: string;
}

export interface IRecommendTripRequest {
  region1: number;
  region2?: number;
  region3?: number;
  sdate: string;
  edate: string;
  transportation: TTransportation;
  age?: number | null;
  people?: number | null;
}

export interface IRecommendTripResponse {
  transportOption: "대중교통" | "자차";
  routes: {
    day: string; // 여행 날짜 (형식: 'xxxx-xx-xx')
    detail: {
      placeId: number; // 장소 ID
      address: string; // 장소 주소
      placeTitle: string; // 장소 제목
      routeIndex: number; // 경로 인덱스
      placeImage: string; // 장소 이미지 URL
      mapx: number; // 장소 X 좌표
      mapy: number; // 장소 Y 좌표
      day: number; // 여행 날짜의 몇 번째 날
      distance: string | null; // '약 10Km'; 마지막 여행지면 null
      estimatedTime: string | null; // '약 10분'; 마지막 여행지면 null
      playTime: string; // 체류 시간 (예: '2시간')
      mapLink: string | null; // 지도 링크 (마지막 여행지면 null)
    }[];
  }[];
}
