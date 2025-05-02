interface AlertDialogProps {
  isLoading: boolean; // Controls whether the loading is displayed or not
}

const Loading = ({ isLoading }: AlertDialogProps) => {
  if (!isLoading) return;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-15 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
};
export default Loading;
