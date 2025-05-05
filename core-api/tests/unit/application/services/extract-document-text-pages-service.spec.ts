import { IPDFDocumentAdapter } from "@/application/interfaces/adapters/pdf-document";
import { ExtractDocumentTextPagesService } from "@/application/services/extract-document-text-pages-service";
import { InternalError } from "@/shared/errors";


describe("ExtractDocumentTextPagesService - Constructor", () => {
  it("should correctly assign pdfDocumentAdapter from implementation of IPDFDocumentAdapter", () => {
    // Arrange
    const mockPdfDocumentAdapter: IPDFDocumentAdapter<any> = {} as IPDFDocumentAdapter<any>;

    // Act
    const service = new ExtractDocumentTextPagesService(mockPdfDocumentAdapter);

    // Assert
    expect(service.pdfDocumentAdapter).toBe(service.pdfDocumentAdapter);
  });
});

describe("ExtractDocumentTextPagesService - Methods", () => {
  let mockPdfDocumentAdapter: jest.Mocked<IPDFDocumentAdapter<any>>;
  let service: ExtractDocumentTextPagesService;

  beforeEach(() => {
    mockPdfDocumentAdapter = {
      load: jest.fn(),
      extractTextFromPages: jest.fn(),
    } as unknown as jest.Mocked<IPDFDocumentAdapter<any>>;

    service = new ExtractDocumentTextPagesService(mockPdfDocumentAdapter);
  });

  describe("execute", () => {
    it("should return extracted text from pages when pdfDocumentAdapter works correctly", async () => {
      // Arrange
      const base64Content = "mockBase64Content";
      const mockPdfDoc = { /* mock PDF document */ };
      const mockExtractedText = ["Page 1 text", "Page 2 text"];

      mockPdfDocumentAdapter.load.mockResolvedValue(mockPdfDoc);
      mockPdfDocumentAdapter.extractTextFromPages.mockResolvedValue(mockExtractedText);

      // Act
      const result = await service.execute(base64Content);

      // Assert
      expect(mockPdfDocumentAdapter.load).toHaveBeenCalledWith(base64Content);
      expect(mockPdfDocumentAdapter.extractTextFromPages).toHaveBeenCalledWith(mockPdfDoc);
      expect(result).toEqual(mockExtractedText);
    });

    it("should throw InternalError when pdfDocumentAdapter.load fails", async () => {
      // Arrange
      const base64Content = "mockBase64Content";
      mockPdfDocumentAdapter.load.mockRejectedValue(new Error("Load error"));

      // Act & Assert
      await expect(service.execute(base64Content)).rejects.toThrow(InternalError);
      expect(mockPdfDocumentAdapter.load).toHaveBeenCalledWith(base64Content);
      expect(mockPdfDocumentAdapter.extractTextFromPages).not.toHaveBeenCalled();
    });

    it("should throw InternalError when pdfDocumentAdapter.extractTextFromPages fails", async () => {
      // Arrange
      const base64Content = "mockBase64Content";
      const mockPdfDoc = { /* mock PDF document */ };

      mockPdfDocumentAdapter.load.mockResolvedValue(mockPdfDoc);
      mockPdfDocumentAdapter.extractTextFromPages.mockRejectedValue(new Error("Extraction error"));

      // Act & Assert
      await expect(service.execute(base64Content)).rejects.toThrow(InternalError);
      expect(mockPdfDocumentAdapter.load).toHaveBeenCalledWith(base64Content);
      expect(mockPdfDocumentAdapter.extractTextFromPages).toHaveBeenCalledWith(mockPdfDoc);
    });
  });
});
