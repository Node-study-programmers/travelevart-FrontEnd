import React from "react";
import ReactDOM from "react-dom";
import { VscLoading } from "react-icons/vsc";
export default function LoadingModal() {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <VscLoading className="animate-spin text-primary text-4xl" />
        <p className="mt-4 text-gray-700 text-xl animate-pulse">Loading...</p>
      </div>
    </div>,
    document.body,
  );
}
