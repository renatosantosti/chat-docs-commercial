import { IPDFDocumentAdapter } from "@/application/interfaces/adapters/pdf-document";
import { Buffer } from "buffer";
import PDFParser from "pdf2json";

export class PDFDocumentAdapter implements IPDFDocumentAdapter<any> {
  async load(content: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
        resolve(pdfData);
      });

      pdfParser.on("pdfParser_dataError", (err: any) => {
        console.error("Erro ao processar o PDF:", err);
        reject(err);
      });

      // Carrega o conteúdo em formato base64
      const binaryData = Buffer.from(content, "base64");
      pdfParser.parseBuffer(binaryData);
    });
  }

  async extractTextFromPages(pdfDoc: any): Promise<string[]> {
    const pageTexts: string[] = [];

    pdfDoc.Pages.forEach((page: any) => {
      const pageText = page.Texts.map((textItem: any) =>
        decodeURIComponent(textItem.R[0].T),
      ).join(""); // Combine all text items into a single string for the page

      pageTexts.push(pageText); // Add the full page text to the result array
    });

    return pageTexts;
  }
}
