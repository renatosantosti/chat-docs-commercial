export interface DocumentItem {
  id: number;
  title: string;
  description: string;
  date: string;
  pages: number;
  type: string;
}

export interface PageItem {
  pageId: number;
  documentId: number;
  documentName: string;
  pageNumber: number;
  content: string;
}
