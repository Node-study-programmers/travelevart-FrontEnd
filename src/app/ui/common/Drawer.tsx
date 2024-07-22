import { createPortal } from "react-dom";
import { IoCloseSharp, IoNotifications } from "react-icons/io5";
import { useEffect, useState } from "react";

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
  const [isVisible, setIsVisible] = useState(open);
  const [notifList, setNotifList] = useState(notifications);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 300); // 애니메이션 시간과 맞추기
      return () => clearTimeout(timeout);
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

  if (!isVisible) return null;

  return createPortal(
    <div
      className={`fixed inset-0 top-0 right-0 z-50 bg-[rgba(0,0,0,0.8)] flex flex-col transition-opacity duration-300 items-end`}
    >
      <div className={`sm:w-[500px] lg:h-full flex flex-col w-screen h-full`}>
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
        </div>
      </div>
    </div>,
    document.body,
  );
}