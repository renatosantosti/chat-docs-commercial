import {
  createMap,
  createMapper,
  forMember,
  mapFrom,
  Mapper,
} from "@automapper/core";
import { pojos } from "@automapper/pojos";
import IBaseMapper from "@/application/interfaces/base/base-mapper";
import DocumentDto from "@/domain/dtos/document";
import Document from "@/domain/models/document";

export class DocumentMapper implements IBaseMapper<Document, DocumentDto> {
  private readonly mapper: Mapper;
  constructor() {
    this.mapper = createMapper({
      strategyInitializer: pojos(),
    });

    // Create mapping between Document to DocumentDto
    createMap<Document, DocumentDto>(
      this.mapper,
      "Document",
      "DocumentDto",
      forMember(
        (destination) => destination.id,
        mapFrom((source) => source.id),
      ),
      forMember(
        (destination) => destination.name,
        mapFrom((source) => source.name),
      ),
      forMember(
        (destination) => destination.title,
        mapFrom((source) => source.title),
      ),
      forMember(
        (destination) => destination.description,
        mapFrom((source) => source.description),
      ),
      forMember(
        (destination) => destination.type,
        mapFrom((source) => source.type),
      ),
      forMember(
        (destination) => destination.content,
        mapFrom((source) => source.content),
      ),
      forMember(
        (destination) => destination.url,
        mapFrom((source) => source.url),
      ),
      forMember(
        (destination) => destination.userId,
        mapFrom((source) => source.userId),
      ),
    );

    // Create mapping between DocumentDto to Document
    createMap<DocumentDto, Document>(
      this.mapper,
      "DocumentDto",
      "Document",
      forMember(
        (destination) => destination.id,
        mapFrom((source) => source.id),
      ),
      forMember(
        (destination) => destination.name,
        mapFrom((source) => source.name),
      ),
      forMember(
        (destination) => destination.title,
        mapFrom((source) => source.title),
      ),
      forMember(
        (destination) => destination.description,
        mapFrom((source) => source.description),
      ),
      forMember(
        (destination) => destination.type,
        mapFrom((source) => source.type),
      ),
      forMember(
        (destination) => destination.content,
        mapFrom((source) => source.content),
      ),
      forMember(
        (destination) => destination.url,
        mapFrom((source) => source.url),
      ),
      forMember(
        (destination) => destination.userId,
        mapFrom((source) => source.userId),
      ),
    );
  }

  map(source: Document): DocumentDto {
    return this.mapper.map<Document, DocumentDto>(
      source,
      "DocumentDto",
      "Document",
    );
  }

  mapReverse(source: DocumentDto): Document {
    return this.mapper.map<DocumentDto, Document>(
      source,
      "Document",
      "DocumentDto",
    );
  }

  mapArray(source: Document[]): DocumentDto[] {
    return this.mapper.mapArray<Document, DocumentDto>(
      source,
      "DocumentDto",
      "Document",
    );
  }

  mapArrayReverse(source: DocumentDto[]): Document[] {
    return this.mapper.mapArray<DocumentDto, Document>(
      source,
      "Document",
      "DocumentDto",
    );
  }
}
