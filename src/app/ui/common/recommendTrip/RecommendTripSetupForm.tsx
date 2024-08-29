"use client";

import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import Tooltip from "../Tooltip";
import { IoIosInformationCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { DateRangePicker } from "@nextui-org/date-picker";
import { CalendarDate, parseDate } from "@internationalized/date";
import { RangeValue } from "@react-types/shared";
import { FaCar, FaTrain } from "react-icons/fa";
import Select from "../Select";
import useGetRecommendTrip from "@/app/hooks/recommendTrip/useGetRecommendTrip";
import Loading from "@/app/loading";
import PageContainer from "../PageContainer";
import { useDispatch } from "react-redux";
import { setRecommendTrip } from "@/redux/slices/recommendTripSlice";
import {
  IRecommendTripRequest,
  ISelectedRegion,
  TTransportation,
} from "@/lib/types";
import RecommendLoadingModal from "./RecommendLoadingModal";

const travelRegionGroup = [
  { id: 1, region: "서울" },
  { id: 2, region: "인천" },
  { id: 3, region: "강원도" },
  { id: 4, region: "충북" },
  { id: 5, region: "대전" },
  { id: 6, region: "충남" },
  { id: 7, region: "대구" },
  { id: 8, region: "경북" },
  { id: 9, region: "광주" },
  { id: 10, region: "경남" },
  { id: 11, region: "부산" },
  { id: 12, region: "전북" },
  { id: 13, region: "울산" },
  { id: 14, region: "전남" },
  { id: 15, region: "세종" },
  { id: 16, region: "제주" },
  { id: 17, region: "경기" },
];

const transportOptions = [
  { id: 0, title: "public" },
  { id: 1, title: "car" },
];

const ageRangeOptions = [
  { id: 0, title: "10대", value: 10 },
  { id: 1, title: "20대", value: 20 },
  { id: 2, title: "30대", value: 30 },
  { id: 3, title: "40대", value: 40 },
  { id: 4, title: "50대", value: 50 },
  { id: 5, title: "60대 이상", value: 60 },
];

export default function RecommendTripSetupForm() {
  const currentDate = new Date();
  const initialStartDate = currentDate.toISOString().split("T")[0];
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + 7);
  const initialEndDate = endDate.toISOString().split("T")[0];

  const [selectedRegion, setSelectedRegion] = useState<ISelectedRegion[]>([]);
  const [isRegionFullSelected, setIsRegionFullSelected] = useState(false);
  const [isDateRangeOver, setIsDateRangeOver] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: initialStartDate,
    endDate: initialEndDate,
  });
  const [transport, setTransport] = useState<TTransportation>("public");
  const [selectedAgeRange, setSelectedAgeRange] = useState<number | string>("");
  const [people, setPeople] = useState<number | null>(null);
  const [isReadyRecommend, setIsReadyRecommend] = useState(false);
  const [requestQuery, setRequestQuery] = useState<IRecommendTripRequest>();
  const [isNavigating, setIsNavigating] = useState(false); // 로딩 이후 페이지 리다이렉션
  const router = useRouter();
  const dispatch = useDispatch();

  const selectedRegionCodes = selectedRegion.map((region) => region.id);
  const isCheckedRequiredOptions =
    selectedRegion.length && dateRange && transport && !isDateRangeOver
      ? true
      : false;

  const { data, isLoading } = useGetRecommendTrip(
    requestQuery as IRecommendTripRequest,
    isReadyRecommend,
  );

  // 선택 옵션 초기화
  useEffect(() => {
    setIsNavigating(false);
    handleResetForm();
  }, []);

  useEffect(() => {
    if (isCheckedRequiredOptions) {
      setRequestQuery({
        region1: selectedRegionCodes[0],
        region2: selectedRegionCodes[1] ?? undefined,
        region3: selectedRegionCodes[2] ?? undefined,
        sdate: dateRange.startDate,
        edate: dateRange.endDate,
        transportation: transport,
        age:
          Number(selectedAgeRange.toString().split("대")[0]) === 0
            ? undefined
            : Number(Number(selectedAgeRange.toString().split("대")[0])),
        people: Number(people) === 0 ? undefined : Number(people),
      });
    }
  }, [selectedRegion, dateRange, transport, selectedAgeRange, people]);

  useEffect(() => {
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    const dateDiff =
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

    if (dateDiff > 10) {
      setIsDateRangeOver(true);
    } else {
      setIsDateRangeOver(false);
    }

    // 여행 기간이 하루일 경우 지역 초기화
    if (dateDiff === 0 && selectedRegion.length > 1) {
      setSelectedRegion([selectedRegion[0]]);
      setIsRegionFullSelected(false);
    }
  }, [dateRange.startDate, dateRange.endDate]);

  const handleSelectRegion = (regionCode: number, region: string) => {
    const isAlreadySelected = selectedRegion.find(
      (selected) => selected.id === regionCode,
    );

    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    const dateDiff =
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

    // 하루 여행일 때 지역 선택 제한
    if (dateDiff === 0) {
      if (isAlreadySelected) {
        const updatedRegions = selectedRegion.filter(
          (region) => region.id !== regionCode,
        );
        setSelectedRegion(updatedRegions);
        setIsRegionFullSelected(false);
      } else {
        setSelectedRegion([{ id: regionCode, region }]);
        setIsRegionFullSelected(true);
      }
    } else {
      if (isAlreadySelected) {
        const updatedRegions = selectedRegion.filter(
          (region) => region.id !== regionCode,
        );
        setSelectedRegion(updatedRegions);
        if (updatedRegions.length < 3) {
          setIsRegionFullSelected(false);
        }
      } else {
        if (selectedRegion.length < 3) {
          const updatedRegions = [
            ...selectedRegion,
            { id: regionCode, region },
          ];
          setSelectedRegion(updatedRegions);
          if (updatedRegions.length === 3) {
            setIsRegionFullSelected(true);
          }
        }
      }
    }
  };

  const handleDateRange = (range: RangeValue<CalendarDate>) => {
    if (range.start && range.end) {
      const startDate = new Date(range.start.toString());
      const endDate = new Date(range.end.toString());
      const dateDiff =
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

      if (dateDiff >= 10) {
        setIsDateRangeOver(true);
      } else {
        setDateRange({
          startDate: range.start.toString(),
          endDate: range.end.toString(),
        });
        setIsDateRangeOver(false);
      }
    }
  };

  const handleResetForm = () => {
    setSelectedRegion([]);
    setIsRegionFullSelected(false);
    setIsDateRangeOver(false);
    setDateRange({
      startDate: initialStartDate,
      endDate: initialEndDate,
    });
    setTransport("public");
    setSelectedAgeRange("");
    setPeople(null);
    setIsReadyRecommend(false);
    setRequestQuery(undefined);
  };

  // 추천 일정 응답 받을 경우 해당 일정 상세 페이지로 이동
  useEffect(() => {
    if (!isLoading && data?.data.routes && isReadyRecommend) {
      dispatch(setRecommendTrip(data.data)); // 리덕스에 추천 여행지 저장
      handleResetForm();
      setIsNavigating(true); // 페이지 이동 상태
    }
  }, [isLoading, data, isReadyRecommend]);

  useEffect(() => {
    if (isNavigating) {
      router.push("/recommend-trip/schedule");
    }
  }, [isNavigating]);

  // 추천 일정 받는 동안 보여줄 로딩 UI
  if (isLoading || isNavigating) {
    return <RecommendLoadingModal />;
  }

  return (
    <PageContainer>
      <div className="flex flex-col justify-between min-h-screen">
        <div className="py-4">
          <IoArrowBack
            className="text-2xl hover:cursor-pointer"
            onClick={() => router.back()}
          />
          <div className="flex flex-col justify-center items-center gap-y-2 py-12">
            <p className="text-2xl font-semibold">떠나고 싶은 여행지는?</p>
            <p className="text-sm text-rgb-secondary">
              여행지 추천을 위한 초기 설정을 완성해주세요.
            </p>
          </div>
          <div>
            {/* 지역 */}
            <div>
              <div className="flex flex-col">
                <div className="flex items-center gap-x-1 py-4">
                  <p className="font-semibold">지역</p>
                  <Tooltip
                    content={`최소 한 개 지역 선택은 필수입니다.<br/>지역은 최대 3개까지 선택 가능합니다.<br/>선택한 지역 순서대로 일정이 생성됩니다.`}
                    direction="right"
                  >
                    <IoIosInformationCircle className="text-xl" />
                  </Tooltip>
                </div>
                {dateRange.startDate === dateRange.endDate && (
                  <p className="text-sm text-red-500 mt-2">
                    당일치기 여행에는 한 지역만 갈 수 있어요.
                  </p>
                )}
                {isRegionFullSelected &&
                  dateRange.startDate !== dateRange.endDate && (
                    <p className="text-sm text-red-500 mt-2">
                      지역은 최대 3개까지 선택 가능해요.
                    </p>
                  )}
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 p-4">
                {travelRegionGroup.map((region) => {
                  const isRegionSelected = selectedRegionCodes.includes(
                    region.id,
                  );
                  const isButtonDisabled =
                    selectedRegion.length >= 3 &&
                    !isRegionSelected &&
                    dateRange.startDate !== dateRange.endDate;

                  return (
                    <div
                      key={region.id}
                      className={`relative ${
                        isRegionSelected
                          ? "bg-primary text-white"
                          : "bg-stone-200 text-gray-500"
                      } flex justify-center items-center px-4 py-2 rounded-2xl ${
                        isButtonDisabled ? "opacity-50" : "cursor-pointer"
                      }`}
                      onClick={() => {
                        if (!isButtonDisabled) {
                          handleSelectRegion(region.id, region.region);
                        }
                      }}
                    >
                      {isRegionSelected && (
                        <p className="absolute flex justify-end items-center w-full h-full text-lg font-semibold mr-8">
                          {selectedRegionCodes.indexOf(region.id) + 1}
                        </p>
                      )}
                      <p className={`${isRegionSelected ? "opacity-50" : ""}`}>
                        {region.region}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* 여행 기간 */}
            <div className="mt-12">
              <div className="flex flex-col">
                <div className="flex items-center gap-x-1 py-4">
                  <p className="font-semibold">여행 기간</p>
                  <Tooltip
                    content={`여행 기간은 최대 10일까지 설정할 수 있어요.`}
                    direction="right"
                  >
                    <IoIosInformationCircle className="text-xl" />
                  </Tooltip>
                </div>
                {isDateRangeOver && (
                  <p className="text-sm text-red-500">
                    여행 기간은 최대 10일까지 설정할 수 있어요.
                  </p>
                )}
              </div>
              <div className="p-4">
                <div>
                  <DateRangePicker
                    label=""
                    isRequired
                    minValue={parseDate(initialStartDate)}
                    defaultValue={{
                      start: parseDate(dateRange.startDate),
                      end: parseDate(dateRange.endDate),
                    }}
                    className="bg-[whitesmoke] rounded-xl p-2"
                    variant="bordered"
                    onChange={handleDateRange}
                    calendarProps={{
                      classNames: {
                        base: "bg-white shadow-md rounded-lg",
                        headerWrapper: "py-4",
                        cellButton: [
                          "data-[today=true]:bg-[#00A9FF] text-white rounded-md",
                          "data-[range-start=true]:bg-[#00A9FF] text-white rounded-l-md",
                          "data-[range-end=true]:bg-[#00A9FF] text-white rounded-r-md",
                          "data-[range-selection=true]:bg-[#89CFF3] text-[#00A9FF]",
                          "data-[range-selection=true]:bg-[#A0E9FF] text-[#00A9FF]",
                          "data-[range-selection=true]:bg-[#CDF5FD] text-[#00A9FF]",
                          "data-[today=true]:text-white",
                          "data-[range-selection=true]:text-[#00A9FF]",
                        ],
                        cell: "hover:bg-[#CDF5FD] hover:text-[#00A9FF]",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            {/* 이동 수단 */}
            <div className="mt-12">
              <p className="font-semibold py-4">이동 수단</p>
              <div className="flex w-full p-4">
                {transportOptions.map((transportOption) => (
                  <div
                    key={transportOption.id}
                    className={`flex justify-center items-center flex-1 px-4 py-2 ${transport === transportOption.title ? "bg-primary text-white" : "bg-stone-200 text-gray-500"} ${transportOption.id === 0 ? "rounded-tl-xl rounded-bl-xl" : "rounded-tr-xl rounded-br-xl"} cursor-pointer transition-all duration-300 ease-in-out`}
                    onClick={() =>
                      setTransport(transportOption.title as TTransportation)
                    }
                  >
                    <div className="flex flex-col justify-center items-center gap-y-2 py-2">
                      {transportOption.id === 0 ? (
                        <FaTrain className="text-2xl" />
                      ) : (
                        <FaCar className="text-2xl" />
                      )}
                      {transportOption.title === "public"
                        ? "대중교통"
                        : "승용차"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 선택 사항 */}
            <div className="mt-12">
              <div className="flex items-center gap-x-1 py-4">
                <p className="font-semibold">선택 사항</p>
                <Tooltip
                  content={`연령대, 인원은 필수 사항이 아니에요.`}
                  direction="right"
                >
                  <IoIosInformationCircle className="text-xl" />
                </Tooltip>
              </div>
              <div className="flex flex-col gap-y-8">
                <div className="w-full p-4">
                  <Select
                    placeholder="연령대 선택"
                    label="연령대"
                    className="w-full !max-w-none !rounded-xl"
                    items={ageRangeOptions.map((option) => option.title)}
                    defaultValue={selectedAgeRange}
                    onChange={setSelectedAgeRange}
                  />
                </div>
                <div>
                  <p className="font-semibold">인원</p>
                  <div className="w-full p-4">
                    <input
                      type="number"
                      placeholder="함께 갈 인원 수 입력"
                      className="w-full p-4 bg-white shadow-xl rounded-xl outline-none"
                      value={people || ""}
                      min={1}
                      onChange={(e) =>
                        setPeople(
                          e.target.value ? parseInt(e.target.value) : null,
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className={`px-4 py-2 rounded-xl my-12 ${
            isCheckedRequiredOptions
              ? "bg-primary text-white"
              : "bg-stone-200 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isCheckedRequiredOptions}
          onClick={() => setIsReadyRecommend(true)}
        >
          일정 생성하기
        </button>
      </div>
    </PageContainer>
  );
}
