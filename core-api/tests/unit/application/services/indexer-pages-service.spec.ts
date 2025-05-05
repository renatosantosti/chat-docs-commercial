import { IGptTextAdapter } from "@/application/interfaces/adapters/gpt-adapter";
import { IIndexerAdapter } from "@/application/interfaces/adapters/indexer-adapter";
import { SearchIndexerService } from "@/application/services/indexer-pages-service";
import { DocumentTextPageDto } from "@/domain/dtos/search-dtos";
import path from 'path';
// console.log('CHECK PATH:', path.resolve(__dirname, '../../../../src/application/services/indexer-pages-service.ts'));

describe("SearchIndexerService - Constructor", () => {
  it("should correctly assign indexName, embeddingGenerator, and searchIndexer", () => {
    // Arrange
    const mockIndexName = "testIndex";
    const mockEmbeddingGenerator: IGptTextAdapter = {} as IGptTextAdapter;
    const mockSearchIndexer: IIndexerAdapter = {} as IIndexerAdapter;

    // Act
    const service = new SearchIndexerService(
      mockIndexName,
      mockEmbeddingGenerator,
      mockSearchIndexer,
    );

    // Assert
    expect(service["indexName"]).toBe(mockIndexName);
    expect(service["embeddingGenerator"]).toBe(mockEmbeddingGenerator);
    expect(service["searchIndexer"]).toBe(mockSearchIndexer);
  });
});

describe("SearchIndexerService - Methods", () => {
  let mockEmbeddingGenerator: jest.Mocked<IGptTextAdapter>;
  let mockSearchIndexer: jest.Mocked<IIndexerAdapter>;
  let service: SearchIndexerService;

  beforeEach(() => {
    mockEmbeddingGenerator = {
      getEmbedding: jest.fn(),
    } as unknown as jest.Mocked<IGptTextAdapter>;

    mockSearchIndexer = {
      indexContent: jest.fn(),
    } as unknown as jest.Mocked<IIndexerAdapter>;

    service = new SearchIndexerService("testIndex", mockEmbeddingGenerator, mockSearchIndexer);
  });

  describe("execute", () => {
    it("should process pages and call embeddingGenerator and searchIndexer correctly", async () => {
      // Arrange
      const mockPages: DocumentTextPageDto[] = [
        {
          documentId: 1,
          documentName: "Document 1",
          pageNumber: 1,
          content: "Page 1 content",
        },
        {
          documentId: 2,
          documentName: "Document 2",
          pageNumber: 2,
          content: "Page 2 content",
        },
      ];

      const mockEmbeddings = [
        [0.1, 0.2, 0.3], // Embedding for the first page
        [0.4, 0.5, 0.6], // Embedding for the second page
      ];

      mockEmbeddingGenerator.getEmbedding
        .mockResolvedValueOnce(mockEmbeddings[0])
        .mockResolvedValueOnce(mockEmbeddings[1]);

      // Act
      const result = await service.execute(mockPages);

      // Assert
      expect(mockEmbeddingGenerator.getEmbedding).toHaveBeenCalledTimes(2);
      expect(mockEmbeddingGenerator.getEmbedding).toHaveBeenCalledWith("Page 1 content");
      expect(mockEmbeddingGenerator.getEmbedding).toHaveBeenCalledWith("Page 2 content");

      expect(mockSearchIndexer.indexContent).toHaveBeenCalledTimes(2);
      expect(mockSearchIndexer.indexContent).toHaveBeenCalledWith("testIndex", {
        ...mockPages[0],
        embedding: mockEmbeddings[0],
      });
      expect(mockSearchIndexer.indexContent).toHaveBeenCalledWith("testIndex", {
        ...mockPages[1],
        embedding: mockEmbeddings[1],
      });

      expect(result).toBe(true);
    });

    it("should return false and log an error if an exception occurs", async () => {
      // Arrange
      const mockPages: DocumentTextPageDto[] = [
       {
          documentId: 1,
          documentName: "Document 1",
          pageNumber: 1,
          content: "Page 1 content",
        },
      ];

      mockEmbeddingGenerator.getEmbedding.mockRejectedValue(new Error("Embedding error"));

      // Act
      const result = await service.execute(mockPages);

      // Assert
      expect(mockEmbeddingGenerator.getEmbedding).toHaveBeenCalledWith("Page 1 content");
      expect(mockSearchIndexer.indexContent).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});
