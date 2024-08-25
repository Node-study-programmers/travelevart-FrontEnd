"use client";

import { useEffect, useState } from "react";
import { DateRangePicker } from "@nextui-org/date-picker";
import { CalendarDate, parseDate } from "@internationalized/date";
import { useRouter } from "next/navigation";
import useTravelRouteSetup from "@/app/hooks/travelRoute/useTravelRouteSetup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setTravelRoute } from "@/redux/slices/travelRouteSlice";
import { RangeValue } from "@react-types/shared";
import Link from "next/link";
import { logoFont } from "@/font";
import { FaCar, FaTrain } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import usePatchCustomData from "@/app/hooks/custom/usePatchCustomData";

export interface ISetupFormValues {
  travelRouteName: string;
  travelRouteRange: number;
  startDate: string;
  endDate: string;
}

export const travelRouteRangeOptions = [
  {
    id: 0,
    title: "나만 보기",
  },
  {
    id: 1,
    title: "전체 공개",
  },
];

const travelRouteTransportOptions = [
  {
    id: 0,
    title: "대중교통",
  },
  {
    id: 1,
    title: "승용차",
  },
];

export default function TravelRouteSetUpForm({
  routeId,
}: {
  routeId?: string | null;
}) {
  const currentDate = new Date();
  const initialStartDate = currentDate.toISOString().split("T")[0];
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + 7);
  const initialEndDate = endDate.toISOString().split("T")[0];

  const [travelRouteRange, setTravelRouteRange] = useState(0);
  const [travelRouteTransport, setTravelRouteTransport] = useState(0);
  const [dateRange, setDateRange] = useState({
    startDate: initialStartDate,
    endDate: initialEndDate,
  });
  const travelRoute = useSelector((state: RootState) => state.travelRoute);
  const router = useRouter();
  const dispatch = useDispatch();
  const { mutate, isPending } = useTravelRouteSetup();
  const { mutate: patchData, isPending: isPatchLoading } = routeId
    ? usePatchCustomData(routeId)
    : { mutate: () => {}, isPending: false };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISetupFormValues>({
    defaultValues: {
      travelRouteName: routeId ? travelRoute.travelRouteName : "",
      travelRouteRange: 0,
      startDate: initialStartDate,
      endDate: initialEndDate,
    },
  });

  const handleDateRange = (range: RangeValue<CalendarDate>) => {
    if (range.start && range.end) {
      setDateRange({
        startDate: range.start.toString(),
        endDate: range.end.toString(),
      });
    }
  };

  const handleCustomizing = (data: ISetupFormValues) => {
    if (routeId) {
      console.log("수정하기");
      console.log(data.travelRouteRange, "range");
      patchData(
        {
          reqData: {
            travelName: data.travelRouteName,
            travelrouteRange: travelRouteRange,
          },
        },
        {
          onSuccess: () => {
            console.log(travelRoute.travelRouteRange);
            dispatch(
              setTravelRoute({
                travelRouteName: data.travelRouteName,
                travelRouteRange: travelRouteRange,
                travelRouteId: travelRoute.travelRouteId,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                travelRouteTransport:
                  travelRouteTransportOptions[travelRouteTransport].title,
              }),
            );
            router.push(`/travel-route/custom/${routeId}`);
            reset();
          },
        },
      );
    } else {
      mutate(
        {
          travelRouteName: data.travelRouteName,
          travelRouteRange: data.travelRouteRange,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        },
        {
          onSuccess: (res) => {
            dispatch(
              setTravelRoute({
                travelRouteName: res.travelName,
                travelRouteRange,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                travelRouteId: res.id,
                travelRouteTransport:
                  travelRouteTransportOptions[travelRouteTransport].title,
              }),
            );
            router.push(`/travel-route/custom/${res.id}`);
            reset();
          },
        },
      );
    }
  };
  console.log(travelRouteRange);
  console.log(travelRouteTransport);
  useEffect(() => {
    if (routeId) {
      setTravelRouteRange(travelRoute.travelRouteRange);

      const transportId =
        travelRoute.travelRouteTransport === "car"
          ? travelRouteTransportOptions.find(
              (option) => option.title === "승용차",
            )?.id
          : travelRoute.travelRouteTransport === "public"
            ? travelRouteTransportOptions.find(
                (option) => option.title === "대중교통",
              )?.id
            : undefined;

      if (transportId !== undefined) {
        setTravelRouteTransport(transportId);
      }

      setDateRange({
        startDate: travelRoute.startDate,
        endDate: travelRoute.endDate,
      });
    }
  }, []);

  return (
    <div className="bg-[whitesmoke] min-h-screen flex flex-col items-center">
      <div className="w-screen lg:max-w-screen-md mx-auto mt-20 border-2 border-gray-300 bg-white">
        <h1
          className={`p-5 bg-white text-left my-auto flex items-center text-3xl ${logoFont.className} border-gray-300 border-b-2 cursor-pointer`}
        >
          <Link href="/">TravelevarT</Link>
        </h1>
        <div className="flex justify-center items-center bg-white flex-col py-20 px-auto">
          <div className="w-full lg:w-1/2 mx-auto flex flex-col gap-10 px-5 lg:px-1">
            <div className="flex justify-center items-center flex-col w-full">
              <span className="text-2xl">
                나만의 TravelRoute를 만들어보세요!
              </span>
            </div>
            <form
              className="flex flex-col gap-y-8"
              onSubmit={handleSubmit(handleCustomizing)}
            >
              <div>
                <p className="pb-2">TravelRoute</p>
                <input
                  type="name"
                  className="border border-gray-300 p-2 w-full rounded-lg py-3 outline-none"
                  placeholder="TravelRoute 입력"
                  {...register("travelRouteName", {
                    required: "travelroute 입력은 필수입니다.",
                  })}
                />
                {errors.travelRouteName && (
                  <p className="text-red-500 text-sm py-2">
                    {errors.travelRouteName.message}
                  </p>
                )}
              </div>
              <div>
                <p className="pb-2">공개 범위</p>
                <div className="flex w-full">
                  {travelRouteRangeOptions.map((travelRouteRangeOption) => (
                    <div
                      key={travelRouteRangeOption.id}
                      className={`flex justify-center items-center flex-1 px-4 py-2 ${travelRouteRange === travelRouteRangeOption.id ? "bg-primary text-white" : "bg-stone-200 text-gray-500"} ${travelRouteRangeOption.id === 0 ? "rounded-tl-xl rounded-bl-xl" : "rounded-tr-xl rounded-br-xl"} cursor-pointer transition-all duration-300 ease-in-out`}
                      onClick={() =>
                        setTravelRouteRange(travelRouteRangeOption.id)
                      }
                    >
                      {travelRouteRangeOption.title}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="pb-2">이동수단</p>
                <div className="flex w-full">
                  {travelRouteTransportOptions.map(
                    (travelRouteTransportOption) => (
                      <div
                        key={travelRouteTransportOption.id}
                        className={`flex justify-center items-center flex-1 px-4 py-2 ${travelRouteTransport === travelRouteTransportOption.id ? "bg-primary text-white" : "bg-stone-200 text-gray-500"} ${travelRouteTransportOption.id === 0 ? "rounded-tl-xl rounded-bl-xl" : "rounded-tr-xl rounded-br-xl"} cursor-pointer transition-all duration-300 ease-in-out`}
                        onClick={() =>
                          setTravelRouteTransport(travelRouteTransportOption.id)
                        }
                      >
                        <div className="flex flex-col justify-center items-center gap-y-2 py-2">
                          {travelRouteTransportOption.id === 0 ? (
                            <FaTrain className="text-2xl" />
                          ) : (
                            <FaCar className="text-2xl" />
                          )}
                          {travelRouteTransportOption.title}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div>
                <DateRangePicker
                  label="여행 기간"
                  isRequired
                  isDisabled={routeId ? true : false}
                  defaultValue={{
                    start: parseDate(dateRange.startDate),
                    end: parseDate(dateRange.endDate),
                  }}
                  className={`w-full border-2 border-stone-200 rounded-xl ${
                    routeId ? "bg-gray-200 opacity-50 cursor-not-allowed" : ""
                  }`}
                  variant="bordered"
                  onChange={handleDateRange}
                  calendarProps={{
                    classNames: {
                      base: "bg-[whitesmoke] shadow-md rounded-lg",
                      headerWrapper: "py-4",
                      cellButton: [
                        "data-[today=true]:bg-primary rounded-md",
                        "data-[range-start=true]:bg-primary text-white rounded-l-md",
                        "data-[range-end=true]:bg-primary text-white rounded-r-md",
                        "data-[range-selection=true]:bg-primary text-primary-dark",
                      ],
                    },
                  }}
                />
              </div>
              <div className="w-full h-[1px] bg-gray-300 my-6" />
              <div className="flex justify-center items-center gap-x-4">
                <button
                  className="bg-stone-200 text-gray-500 px-4 py-2 rounded-xl"
                  onClick={() => router.back()}
                >
                  돌아가기
                </button>
                <button className="bg-primary text-white px-4 py-2 rounded-xl">
                  커스텀하기
                </button>
              </div>
            </form>
            {/* 토스트 UI로 바꾸기 */}
            {isPending ? <div>Loading...</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
