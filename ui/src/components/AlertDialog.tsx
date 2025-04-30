import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { X } from "lucide-react"; // Import the close icon from lucide-react

interface AlertDialogProps {
  mode: "alert" | "error" | "confirmation" | "warning"; // Determines the dialog type
  title: string; // Dialog title
  description: string; // Dialog description
  cancelButtonText: string; // Text for the cancel button
  confirmButtonText: string; // Text for the confirm button
  onCancel(): void; // Callback for cancel action
  onConfirm(): void; // Callback for confirm action
  open: boolean; // Controls whether the dialog is open
}

const AlertDialogBox = ({
  mode,
  title,
  description,
  cancelButtonText,
  confirmButtonText,
  onCancel,
  onConfirm,
  open,
}: AlertDialogProps) => {
  // Dynamic styles based on the mode
  const getColor = () => {
    switch (mode) {
      case "error":
        return "red";
      case "warning":
        return "yellow";
      case "confirmation":
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Portal>
        {/* Overlay */}
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        {/* Dialog Content */}
        <AlertDialog.Content
          className="fixed top-1/2 left-1/2 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl"
        >
          {/* Close Icon Button */}
          <AlertDialog.Cancel asChild>
            <button
              onClick={onCancel}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </AlertDialog.Cancel>

          {/* Title */}
          <AlertDialog.Title className="text-lg font-semibold text-gray-900">
            {title}
          </AlertDialog.Title>

          {/* Description */}
          <AlertDialog.Description className="mt-3 text-sm text-gray-600">
            {description}
          </AlertDialog.Description>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <AlertDialog.Cancel asChild>
              <button
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                {cancelButtonText}
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className={`px-4 py-2 text-sm font-medium text-white bg-${getColor()}-500 rounded-lg hover:bg-${getColor()}-600 focus:outline-none focus:ring-2 focus:ring-${getColor()}-300`}
              >
                {confirmButtonText}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default AlertDialogBox;