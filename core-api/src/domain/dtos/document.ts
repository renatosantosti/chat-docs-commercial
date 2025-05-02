type DocumentDto = {
  id: number;
  name: string;
  title: string;
  description?: string;
  content?: string;
  type: string;
  numPages: number;
  url?: string;
  isActive: boolean;
  userId: number;
  createdAt: Date;
};

export default DocumentDto;
