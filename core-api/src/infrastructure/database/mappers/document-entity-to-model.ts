import IBaseMapper from '@/application/interfaces/base/base-mapper';
import DocumentEntity from '../entities/document';
import Document from '@/domain/models/document';

export class DocumentEntityMapper implements IBaseMapper<Document, Partial<DocumentEntity>> {
 
    map(source: Document): Partial<DocumentEntity> {
        return {
            id: source.id || 0,
            name: source.name,
            title: source.title,
            description: source.description,
            userId: source.userId,
            url: source.url,
            pages: [],
            type: source.type || 'application/pdf',
            isActive: source.isActive || true,
            createdBy: source.createdBy || 'system',
            createdOn: source.createdOn || new Date(),
            modifiedBy: source.modifiedBy || 'system',
            modifiedOn: source.modifiedOn || new Date(),
        };
    }

    mapReverse(source: DocumentEntity): Document {
        return {
            id: source.id || 0,
            name: source.name,
            title: source.title,
            description: source.description,
            userId: source.userId,
            url: source.url,
            pages: source.pages,
            type: source.type || 'application/pdf',
            isActive: source.isActive || true,
            createdBy: source.createdBy || 'system',
            createdOn: source.createdOn || new Date(),
            modifiedBy: source.modifiedBy || 'system',
            modifiedOn: source.modifiedOn || new Date(),
        };
    }

    mapArray(source: Document[]): Partial<DocumentEntity>[] {
        return source.map(doc => this.map(doc));
    }
    
    mapArrayReverse(source: DocumentEntity[]): Document[] {
        return source.map(entity => this.mapReverse(entity));
    }
}