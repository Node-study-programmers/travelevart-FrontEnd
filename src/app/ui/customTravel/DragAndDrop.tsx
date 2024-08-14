import { ITravelItems } from "@/app/travel-route/custom/[id]/page";
import { ITravelCustomData } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

export default function TodoLibraryExample({
  items,
  setItems,
  travelRouteBaseInfo,
  dateRange,
}: {
  items: ITravelItems;
  setItems: (items: ITravelItems) => void;
  travelRouteBaseInfo: ITravelCustomData;
  dateRange: string[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 남은 일수 계산
  const calculateDaysLeft = () => {
    const today = new Date();
    const startDate = new Date(travelRouteBaseInfo.startDate);
    const timeDiff = startDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  };

  const daysLeft = calculateDaysLeft();

  // 초기화 로직
  useEffect(() => {
    if (Object.keys(items).length === 0) {
      const initialItems: ITravelItems = {};
      dateRange.forEach((date) => {
        initialItems[date] = [];
      });
      setItems(initialItems);
    }
  }, [dateRange, items, setItems]);

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

  // 모달 열기
  const openModal = (date: string) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <div className="lg:w-1/2">
      <div className="mb-2 bg-primary p-4 min-h-64 flex flex-col justify-around px-10 text-white relative">
        <h1 className="text-3xl font-bold ">
          {travelRouteBaseInfo.travelRouteName}
          {travelRouteBaseInfo.travelRouteRange === 0 ? (
            <div className="text-sm py-2 bg-secondary w-fit px-3 rounded-3xl">
              비공개
            </div>
          ) : (
            <div className="text-sm pl-2 py-2">공개</div>
          )}
        </h1>

        <div>
          <span className="bg-secondary text-lg w-fit px-5 py-2 rounded-3xl">
            {travelRouteBaseInfo.startDate} - {travelRouteBaseInfo.endDate}
          </span>
          <span className="ml-4">
            {daysLeft > 0
              ? `여행까지 ${daysLeft}일 남았습니다.`
              : "여행이 시작되었습니다!"}
          </span>
        </div>

        <div className="absolute right-1 bottom-1 text-white">TravelevarT</div>
      </div>

      <div className="mt-4 flex flex-col overflow-scroll h-screen px-10">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(items).map((key, dayIndex) => (
            <Droppable key={key} droppableId={key}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-h-32"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">
                      {dayIndex + 1}일차
                    </span>
                    <span className="text-gray-500">{key}</span>
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
                          flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm transition-shadow
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
                                <img
                                  src={item.placeImage}
                                  alt={item.placeTitle}
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
