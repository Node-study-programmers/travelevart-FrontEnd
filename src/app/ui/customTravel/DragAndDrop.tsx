import { ITravelItems } from "@/app/travel-route/custom/[id]/page";
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
}: {
  items: ITravelItems;
  setItems: (items: ITravelItems) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

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
    <div className="p-4">
      <div className="mb-2">
        <h1 className="text-3xl font-bold">Travel Itinerary</h1>
        <span>Organize your travel plans</span>
      </div>

      <div className="mt-4 flex flex-col space-y-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(items).map((key, dayIndex) => (
            <Droppable key={key} droppableId={key}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-4"
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

                  {/* + 버튼 추가 */}
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={() => openModal(key)}
                      className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                    >
                      + 추가하기
                    </button>
                  </div>

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>

      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">새 항목 추가</h2>
            <p>{selectedDate}에 새 항목을 추가합니다.</p>
            {/* 여기에 입력 필드와 추가 버튼 등을 구현 */}
            <button
              onClick={closeModal}
              className="mt-4 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
