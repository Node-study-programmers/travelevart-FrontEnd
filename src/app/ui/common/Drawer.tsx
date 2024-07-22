import { createPortal } from "react-dom";
import { IoCloseSharp, IoNotifications } from "react-icons/io5";
import { useEffect, useState, MouseEvent } from "react";

interface INotifyDrawer {
  open: boolean;
  onClose?: () => void;
  notifications: Array<{
    id: number;
    title: string;
    content: string;
    timeAgo: string;
  }>;
}

export function NotifyDrawer({ open, onClose, notifications }: INotifyDrawer) {
  const [isVisible, setIsVisible] = useState<boolean>(open);
  const [notifList, setNotifList] = useState<
    Array<{
      id: number;
      title: string;
      content: string;
      timeAgo: string;
    }>
  >(notifications);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "";
      }, 300); // 애니메이션 시간과 맞추기
      return () => {
        clearTimeout(timeout);
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  useEffect(() => {
    setNotifList(notifications);
  }, [notifications]);

  const handleDeleteNotification = (id: number) => {
    setNotifList((prevList) =>
      prevList.filter((notification) => notification.id !== id),
    );
  };

  const handleBackgroundClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  if (!isVisible) return null;

  return createPortal(
    <div
      className={`fixed inset-0 top-0 right-0 z-50 bg-[rgba(0,0,0,0.5)] flex flex-col transition-opacity duration-300 items-end`}
      onClick={handleBackgroundClick}
    >
      <div
        className={`sm:w-[500px] lg:h-full flex flex-col w-screen h-full`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`${
            open
              ? "sm:animate-slide-in-right animate-fade-in"
              : "sm:animate-slide-out-right animate-fade-out"
          } overflow-auto scrollbar-hide pb-10 lg:pb-10 bg-primary flex-1`}
        >
          <h2
            className={`text-xl mb-5 flex items-center px-3 justify-between lg:ml-0 sticky top-0 z-50 bg-primary w-full h-16`}
          >
            <div className="flex gap-2 items-center px-3">
              알림 <IoNotifications />
            </div>
            <IoCloseSharp
              className="text-3xl text-fourth cursor-pointer"
              onClick={onClose}
            />
          </h2>
          <div
            className="mx-5 my-5 bg-fourth text-white px-5 py-2 rounded-lg text-center hover:bg-gray-500 cursor-pointer"
            onClick={() => setNotifList([])}
          >
            <p>모두 지우기</p>
          </div>
          {notifList.length ? (
            <ul className="flex flex-col gap-3 px-3">
              {notifList.map((el) => (
                <li
                  key={el.id}
                  className="bg-secondary rounded-lg text-sm p-3 w-full cursor-pointer relative shadow-lg hover:shadow-inner transition-transform duration-300"
                >
                  <h3 className="font-semibold">{el.title}</h3>
                  <p>{el.content}</p>
                  <p className="text-xs text-gray-500">{el.timeAgo}</p>
                  <IoCloseSharp
                    className="absolute bottom-2 right-2 cursor-pointer"
                    onClick={() => handleDeleteNotification(el.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center h-[50%]">
              알림이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
