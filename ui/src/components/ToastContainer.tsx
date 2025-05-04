import * as Toast from "@radix-ui/react-toast";
import { removeToast, ToastState } from "@/store/toast/slices";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

const ToastContainer: React.FC = () => {
  const dispatch = useDispatch();
  const toasts = useSelector(
    (store: { toast: ToastState }) => store.toast.toasts,
  );

  // Define styles for different toast types
  const getToastStyle = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "info":
        return "bg-blue-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-gray-800";
    }
  };

  return (
    <Toast.Provider swipeDirection="right">
      {toasts.map((toast) => (
        <Toast.Root
          key={toast.id}
          className={`bg-gray-800 text-white rounded-md shadow-lg p-4 transition-transform duration-300 ${getToastStyle(
            toast.type,
          )}`}
          duration={3000} // Auto-dismiss after 3 seconds
          onOpenChange={(open) => {
            if (!open) {
              setTimeout(() => dispatch(removeToast(toast.id)), 100); // Wait for animation to finish
            }
          }}
        >
          <Toast.Title className="font-bold">{toast.title}</Toast.Title>
          <Toast.Description className="text-sm">
            {toast.description}
          </Toast.Description>
          <Toast.Action asChild altText="Dismiss">
            <button
              onClick={() => dispatch(removeToast(toast.id))}
              className="text-sm underline mt-2"
            >
              Dismiss
            </button>
          </Toast.Action>
        </Toast.Root>
      ))}

      <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col space-y-2 outline-none" />
    </Toast.Provider>
  );
};

export default ToastContainer;
