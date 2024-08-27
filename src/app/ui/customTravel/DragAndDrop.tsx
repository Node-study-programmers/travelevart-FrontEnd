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
import { CiMemoPad } from "react-icons/ci";
import { FaCar, FaSearch, FaTrain } from "react-icons/fa";
import { GoGrabber } from "react-icons/go";
import Tooltip from "../common/Tooltip";
import { useRouter } from "next/navigation";
import usePostCustomData from "@/app/hooks/custom/usePostCustomData";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function DragAndDrop({
  items,
  setItems,
  travelRouteBaseInfo,
  dateRange,
  setOpenSearch,
  handleSubmit,
}: {
  items: ITravelItems;
  setItems: (items: ITravelItems) => void;
  travelRouteBaseInfo: ITravelCustomData;
  dateRange: string[];
  setOpenSearch: Dispatch<SetStateAction<boolean>>;
  handleSubmit: () => void;
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    dateKey: string;
    itemIndex: number;
  } | null>(null);
  const [memoContent, setMemoContent] = useState("");

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
    document.documentElement.removeAttribute("style");
    const sourceKey = source.droppableId;
    const destinationKey = destination.droppableId;

    const _items = JSON.parse(JSON.stringify(items)) as ITravelItems;
    const [targetItem] = _items[sourceKey].splice(source.index, 1);
    _items[destinationKey].splice(destination.index, 0, targetItem);
    setItems(_items);
  };

  const handleMemoSubmit = () => {
    if (selectedItem && memoContent) {
      const { dateKey, itemIndex } = selectedItem;
      const updatedItems = JSON.parse(JSON.stringify(items)) as ITravelItems;
      updatedItems[dateKey][itemIndex].contents = memoContent;
      setItems(updatedItems);
      setIsModalOpen(false);
      setMemoContent("");
    }
  };

  const onDragStart = () => {
    document.documentElement.setAttribute("style", "scroll-behavior: auto");
  };

  const handleCancel = () => {
    if (window.confirm("취소 하시겠습니까? 변경사항은 저장되지 않습니다.")) {
      router.push("/mypage");
    }
  };

  const handleDeleteItem = (dateKey: string, itemIndex: number) => {
    if (window.confirm("이 항목을 삭제하시겠습니까?")) {
      const updatedItems = JSON.parse(JSON.stringify(items)) as ITravelItems;
      updatedItems[dateKey].splice(itemIndex, 1);
      setItems(updatedItems);
    }
  };

  return (
    <div className="w-full border-l-2 border-t-2 border-b-2 border-gray-300 bg-white">
      <div className="pb-2 bg-white p-4 min-h-64 flex flex-col justify-around px-5 lg:px-10 text-white relative">
        <div>
          <div className="text-3xl font-bold gap-1 flex items-center line-clamp-1 text-primary">
            {travelRouteBaseInfo.travelRouteName}
          </div>
          <div className="flex gap-3 mt-2">
            {travelRouteBaseInfo.travelRouteTransport === "승용차" ? (
              <div className="text-sm py-2 bg-primary w-fit px-3 rounded-3xl flex items-center gap-2">
                <FaCar />
                승용차
              </div>
            ) : (
              <div className="text-sm py-2 bg-primary w-fit px-3 rounded-3xl flex items-center gap-2">
                <FaTrain />
                대중교통
              </div>
            )}
            {travelRouteBaseInfo.travelRouteRange === 0 ? (
              <div className="text-sm py-2 bg-secondary w-fit px-3 rounded-3xl">
                비공개
              </div>
            ) : (
              <div className="text-sm py-2 bg-secondary w-fit px-3 rounded-3xl">
                공개
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="bg-secondary text-base w-fit px-5 py-2 rounded-3xl">
            {travelRouteBaseInfo.startDate} - {travelRouteBaseInfo.endDate}
          </span>
        </div>
        {/* <div className="absolute right-1 top-1 text-primary">
          By. TravelevarT
        </div> */}
      </div>
      <div className="text-sm flex justify-between py-4 px-5 lg:px-10 bg-white border-b-2 border-gray-300 items-center">
        <div className="flex gap-5">
          <button
            onClick={handleCancel}
            className="border-2 border-red-300 text-black font-bold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 hover:text-white"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-300"
          >
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

      <div className="mt-6 flex flex-col px-2 lg:px-10">
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          {Object.keys(items).map((key, dayIndex) => (
            <Droppable key={key} droppableId={key}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-h-32 bg-[whitesmoke] mb-5 lg:mb-10 rounded-lg p-6 overflow-y-scroll"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">Day{dayIndex + 1}</span>
                    <span className="text-gray-500 text-sm">{key}</span>
                  </div>
                  <div className="w-full h-[1px] bg-gray-300 my-3"></div>
                  {items[key].map((item, index) => (
                    <Draggable
                      key={`${item.placeId}-${index}`}
                      draggableId={`${item.placeId}-${item.placeTitle}-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`
                    bg-white
                    flex flex-col space-y-2 p-2 lg:p-4 rounded-lg shadow-lg transition-shadow mb-5
                    ${snapshot.isDragging ? "shadow-lg" : "shadow"}`}
                        >
                          {/* Draggable Content */}
                          <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center space-y-2">
                              <span className="bg-red-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                              <div className="flex items-center space-x-4">
                                <Image
                                  src={
                                    item.placeImage
                                      ? item.placeImage
                                      : "https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png"
                                  }
                                  alt={item.placeTitle}
                                  width={50}
                                  height={50}
                                  className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-lg"
                                />
                                <div>
                                  <h5 className="font-semibold text-sm lg:text-base overflow-hidden line-clamp-1">
                                    {item.placeTitle}
                                  </h5>
                                  <p className="text-[10px] lg:text-xs text-gray-600 overflow-hidden line-clamp-2">
                                    {item.address}
                                  </p>
                                </div>
                              </div>

                              {item.mapLink && (
                                <a
                                  href={item?.mapLink}
                                  className="text-blue-500 text-sm"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View on Map
                                </a>
                              )}
                            </div>
                            <Tooltip direction="top" content="메모추가">
                              <CiMemoPad
                                className="text-lg cursor-pointer"
                                onClick={() => {
                                  setSelectedItem({
                                    dateKey: key,
                                    itemIndex: index,
                                  });
                                  setIsModalOpen(true);
                                }}
                              />
                            </Tooltip>
                            <button
                              className="text-base"
                              onClick={() => handleDeleteItem(key, index)}
                            >
                              <RiDeleteBin6Line />
                            </button>
                            <GoGrabber className="text-lg" />
                          </div>
                          {/* Memo Section */}
                          {item.contents && (
                            <p className="relative text-xs lg:text-sm bg-third text-gray-800 px-4 py-2 rounded-lg shadow-sm border border-third hover:bg-secondary transition duration-300 ease-in-out flex items-start space-x-2">
                              <span className="font-semibold text-primary">
                                Memo:
                              </span>
                              <span className="flex-1">{item.contents}</span>
                            </p>
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

      {/* Memo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">메모 추가</h2>
            <textarea
              value={memoContent}
              onChange={(e) => setMemoContent(e.target.value)}
              rows={4}
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="메모를 입력하세요..."
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
              >
                취소
              </button>
              <button
                onClick={handleMemoSubmit}
                className="bg-primary text-white py-2 px-4 rounded-lg"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
