import { ITravelItems } from "@/app/travel-route/custom/[id]/page";
import { ITravelCustomData } from "@/lib/types";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { FaCar, FaSearch, FaTrain } from "react-icons/fa";

export default function TodoLibraryExample({
  items,
  setItems,
  travelRouteBaseInfo,
  dateRange,
  setOpenSearch,
}: {
  items: ITravelItems;
  setItems: (items: ITravelItems) => void;
  travelRouteBaseInfo: ITravelCustomData;
  dateRange: string[];
  setOpenSearch: Dispatch<SetStateAction<boolean>>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 초기화 로직
  useEffect(() => {
    if (Object.keys(items).length === 0 && dateRange.length > 0) {
      const initialItems: ITravelItems = {};
      dateRange.forEach((date) => {
        initialItems[date] = [];
      });
      setItems(initialItems);
    }
  }, [dateRange, items]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const sourceKey = source.droppableId;
    const destinationKey = destination.droppableId;

    const _items = JSON.parse(JSON.stringify(items)) as ITravelItems;
    const [targetItem] = _items[sourceKey].splice(source.index, 1);
    _items[destinationKey].splice(destination.index, 0, targetItem);
    setItems(_items);
  };

  // --- requestAnimationFrame 초기화
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }
  // --- requestAnimationFrame 초기화 END

  return (
    <div className="w-full lg:w-1/3 h-screen overflow-scroll border-2 border-gray-300 bg-white">
      <div className="pb-2 bg-primary p-4 min-h-64 flex flex-col justify-around px-5 lg:px-10 text-white relative">
        <div>
          <div className="text-3xl font-bold gap-1 flex items-center line-clamp-1">
            {travelRouteBaseInfo.travelRouteName}
          </div>
          <div className="flex gap-3 mt-2">
            {travelRouteBaseInfo.travelRouteTransport === "승용차" ? (
              <div className="text-sm py-2 bg-blue-900 w-fit px-3 rounded-3xl flex items-center gap-2">
                <FaCar />
                승용차
              </div>
            ) : (
              <div className="text-sm py-2 bg-blue-900 w-fit px-3 rounded-3xl flex items-center gap-2">
                <FaTrain />
                대중교통
              </div>
            )}
            {travelRouteBaseInfo.travelRouteRange === 0 ? (
              <div className="text-sm py-2 bg-blue-500 w-fit px-3 rounded-3xl">
                비공개
              </div>
            ) : (
              <div className="text-sm py-2 bg-blue-500 w-fit px-3 rounded-3xl">
                공개
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="bg-secondary text-lg w-fit px-5 py-2 rounded-3xl">
            {travelRouteBaseInfo.startDate} - {travelRouteBaseInfo.endDate}
          </span>
        </div>
        <div className="bg-gray-300 w-full h-[1px]"></div>
        <div className="absolute right-1 bottom-1 text-white">
          {/* By. TravelevarT */}
        </div>
      </div>
      <div className="flex justify-between py-4 px-5 lg:px-10 bg-primary border-b-2 border-gray-300 items-center">
        <div className="flex gap-5">
          <button className="bg-red-300 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300">
            취소
          </button>
          <button className="bg-primary text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:primary focus:ring-opacity-50 transition duration-300">
            완료
          </button>
        </div>
        <div>
          <button
            onClick={() => setOpenSearch(true)}
            className="lg:hidden outline flex gap-2 items-center bg-primary text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-300"
          >
            장소 검색 <FaSearch />
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col px-5 lg:px-10">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(items).map((key, dayIndex) => (
            <Droppable key={key} droppableId={key}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-h-32 bg-secondary mb-5 lg:mb-10 rounded-lg p-6"
                >
                  <div className="flex items-center space-x-2 border-b-[1px] border-gray-100 pb-2">
                    <span className="text-lg font-bold">Day{dayIndex + 1}</span>
                    <span className="text-gray-500 text-sm">{key}</span>
                  </div>
                  {items[key].map((item, index) => (
                    <Draggable
                      key={`${item.place_id}-${index}`}
                      draggableId={`${item.place_id}-${item.placeTitle}-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`
                          flex items-center space-x-4 p-4 rounded-lg shadow-sm transition-shadow
                          ${snapshot.isDragging ? "shadow-lg" : "shadow"}`}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <span className="bg-red-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                              {index + 1}
                            </span>
                            <span className="text-xs text-gray-500">
                              {item.playTime}
                            </span>
                          </div>
                          <div className="flex-1 flex flex-col space-y-2">
                            <div className="flex items-center space-x-4">
                              {item.placeImage && (
                                <Image
                                  src={item.placeImage}
                                  alt={item.placeTitle}
                                  width={50}
                                  height={50}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              )}
                              <div>
                                <h5 className="font-semibold text-lg">
                                  {item.placeTitle}
                                </h5>
                                <p className="text-sm text-gray-600">
                                  {item.address}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500">
                              {item.contents}
                            </p>
                            <p>{item.id}</p>
                            <a
                              href={item.mapLink}
                              className="text-blue-500 text-sm"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View on Map
                            </a>
                          </div>
                          {item.accommodation_title && (
                            <div className="text-sm text-gray-500">
                              <p>숙소: {item.accommodation_title}</p>
                              <p>{item.accommodation_day}일차 체크인</p>
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
