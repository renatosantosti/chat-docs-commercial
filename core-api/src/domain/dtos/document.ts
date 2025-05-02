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
  createdOn: Date;
};

export default DocumentDto;
