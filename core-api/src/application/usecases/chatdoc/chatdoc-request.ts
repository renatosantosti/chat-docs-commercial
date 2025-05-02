type ChatDocRequest = {
  documentId: number;
  question: string;
  previousQuestion: string;
  previousResponse: string;
};

export default ChatDocRequest;
