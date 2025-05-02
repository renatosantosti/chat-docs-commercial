export interface IPDFDocumentAdapter<T> {
  load(content: string): Promise<T>;
  extractTextFromPages(pdfDoc: T): Promise<string[]>;
}
