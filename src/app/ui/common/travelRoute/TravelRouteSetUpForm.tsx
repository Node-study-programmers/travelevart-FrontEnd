"use client";

import { useState } from "react";
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

interface ISetupFormValues {
  travelRouteName: string;
  travelRouteRange: number;
  startDate: string;
  endDate: string;
}

const travelRouteRangeGroups = [
  {
    id: 0,
    title: "나만 보기",
  },
  {
    id: 1,
    title: "전체 공개",
  },
];

export default function TravelRouteSetUpForm() {
  // 여행 기간
  const currentDate = new Date();
  const initialStartDate = currentDate.toISOString().split("T")[0];
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + 7);
  const initialEndDate = endDate.toISOString().split("T")[0];

  const [travelRouteRange, setTravelRouteRange] = useState(0);
  const [dateRange, setDateRange] = useState({
    startDate: initialStartDate,
    endDate: initialEndDate,
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, mutate } = useTravelRouteSetup();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ISetupFormValues>({
    defaultValues: {
      travelRouteName: "",
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
    console.log(data);

    mutate(
      {
        travelRouteName: data.travelRouteName,
        travelRouteRange: data.travelRouteRange,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      },
      {
        onSuccess: (res) => {
          console.log(res);
          dispatch(
            setTravelRoute({
              travelRouteName: res.travel_name,
              travelRouteRange,
              startDate: dateRange.startDate,
              endDate: dateRange.endDate,
              travelRouteId: res.id,
            }),
          );
          router.push(`/travel-route/custom/${res.id}`);
          reset();
        },
      },
    );
  };

  return (
    <div className="bg-[whitesmoke] h-[80vh] flex flex-col justify-center items-center">
      <div className="w-screen lg:max-w-screen-md mx-auto border-2 border-gray-300 bg-white">
        <h1
          className={`p-5 bg-white text-left my-auto flex items-center text-3xl ${logoFont.className} border-gray-300 border-b-2 cursor-pointer`}
        >
          <Link href="/">TravelevarT</Link>
        </h1>
        <form onSubmit={handleSubmit(handleCustomizing)}>
          <div>
            <p className="">travel route</p>
            <input
              type="name"
              className="border border-gray-300 p-2 w-full rounded-lg py-3 outline-none"
              placeholder="나만의 travelroute 이름을 만들어보세요"
              {...register("travelRouteName", {
                required: "travelroute 이름은 필수입니다.",
              })}
            />
            {errors.travelRouteName && (
              <p className="text-red-500 text-sm">
                {errors.travelRouteName.message}
              </p>
            )}
          </div>
          <div>
            <div>
              <p>공개 범위</p>
              <div className="flex">
                {travelRouteRangeGroups.map((travelRouteRangeGroup) => (
                  <div
                    key={travelRouteRangeGroup.id}
                    className={`bg-[whitesmoke] px-4 py-2 ${travelRouteRange === travelRouteRangeGroup.id ? "bg-primary text-white" : "bg-rgb-background"} ${travelRouteRangeGroup.id === 0 ? "rounded-tl-xl rounded-bl-xl" : "rounded-tr-xl rounded-br-xl"} cursor-pointer transition-all duration-300 ease-in-out`}
                    onClick={() =>
                      setTravelRouteRange(travelRouteRangeGroup.id)
                    }
                  >
                    {travelRouteRangeGroup.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <DateRangePicker
              label="여행 기간"
              isRequired
              defaultValue={{
                start: parseDate(dateRange.startDate),
                end: parseDate(dateRange.endDate),
              }}
              className="max-w-xs"
              variant="bordered"
              onChange={handleDateRange}
              calendarProps={{
                classNames: {
                  base: "bg-[whitesmoke] shadow-md rounded-lg",
                  headerWrapper: "pt-4 bg-background",
                },
              }}
            />
          </div>
          <div>
            <button className="bg-primary text-white px-4 py-2 rounded-xl">
              돌아가기
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-xl">
              커스텀하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
