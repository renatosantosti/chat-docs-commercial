type DocumentDto = {
    id: number;
    name: string;
    title: string;
    description?: string;
    content?: string;
    type: string;
    url?: string;
    isActive: boolean;
    userId: number;
  };
  
export default DocumentDto;
  
