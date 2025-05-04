export interface DocumentItem {
  id: number;
  title: string;
  description: string;
  date: string;
  pages: number;
  type: string;
}

export interface UserItem {
  id: number;
  name: string;
  email: string;
}

export interface PageItem {
  pageId: number;
  documentId: number;
  documentName: string;
  pageNumber: number;
  content: string;
}

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  type?: "success" | "error" | "info" | "warning";
}
