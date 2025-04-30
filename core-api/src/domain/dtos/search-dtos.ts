export type DocumentTextPageDto ={
    documentId: number, 
    documentName:string,
    pageNumber:number,
    content: string,
}

export type EmbeddingDocumentDto ={
    documentId: number, 
    pageNumber:number,
    embedding: number[]
}

export type IndexedDocumentDto ={
    documentId: number, 
    documentName:string,
    pageNumber:number,
    content: string,
    embedding: number[],
}

export type SearchResultDto ={
    documentId: number, 
    documentName:string,
    pageNumber:number,
    content: string,
}

export type SearchTermDto = {
    documentId?: number,
    pageNumber?: number,
    term: string,
}

export type SearchEmbeddedDocumentDto ={
    documentId: number, 
    embedding: number[]
}

export type SearchTermResponseDto = {
    documentId?: number,
    pageNumber?: number,
    content: string,
}

export type ChatDocResultDto = {
    documentId: number,
    response: string[],
    pages:SearchTermResponseDto[]
}
