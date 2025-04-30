import { IPDFDocumentAdapter } from "application/interfaces/adapters/pdf-document";
import { IExtractDocumentTextPagesService } from "application/interfaces/services/extract-document-text-pages-service-interface";
import { InternalError } from "shared/errors";


// Implement the ExtractDocumentTextPagesService
export class ExtractDocumentTextPagesService implements IExtractDocumentTextPagesService {

    constructor(readonly pdfDocumentAdapter: IPDFDocumentAdapter<any>) {}

    async execute(base64Content: string): Promise<string[] | Error> {
        try {
            const pdfDoc = await this.pdfDocumentAdapter.load(base64Content);
            return await this.pdfDocumentAdapter.extractTextFromPages(pdfDoc);
        } catch (error) {
            console.error("Error on pdfDocumentAdapter:", {error});
            throw new InternalError("Failed to extract pages text from document");
        }
    }
}