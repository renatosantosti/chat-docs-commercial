import { Client } from "@elastic/elasticsearch";
import { IIndexerAdapter } from "application/interfaces/adapters/indexer-adapter";
import { IndexedDocumentDto, SearchTermDto, SearchResultDto, SearchEmbeddedDocumentDto } from "domain/dtos/search-dtos";

export class SlasticSearchIndexer implements IIndexerAdapter {
    private client: Client;
    private embeddingDims: number;

    constructor(host: string, port: number, user: string, password:string, embeddingDims: number) {
        try{
            this.client = new Client({ 
                node: `${host}:${port}`, 
                auth: {
                    username: user,
                    password: password,
                  },
            });    
            this.embeddingDims = embeddingDims;    
        }
        catch(error){
            console.error("Erro to connect on Indexer provider!", {"Error details": error})
            throw new Error("Erro to connect on Indexer provider!")
        }
    }

    /**
     * Performs a term-based search using the provided filter.
     * @param indexName - The index name
     * @param filter - An object containing the search criteria.
     * @returns A promise resolving to an array of matching documents.
     */
    async searchByTerm(indexName: string, filter: SearchTermDto): Promise<SearchResultDto[]> {
        const query: any = {
            wildcard: {
                content: {
                    value: `*${filter.term}*`, // Use wildcard to match the term within words
                    case_insensitive: true
                }
            }
        };
    
        const highlight: any = {
            fields: {
                content: {
                    fragment_size: 500, // Limit the size of the highlighted fragment
                    number_of_fragments: 1, // Return only one fragment
                    pre_tags: ["<strong>"], // Highlight start tag
                    post_tags: ["</strong>"] // Highlight end tag
                }
            }
        };
    
        const response = await this.client.search({
            index: indexName,
            query: query,
            highlight: highlight
        });
    
        return response.hits.hits.map((hit: any) => ({
            ...hit._source,
            highlight: hit.highlight?.content || [] // Include highlighted content in the result
        }));
    }

    /**
     * Performs a semantic search using the provided filter and query embedding.
     * @param indexName - The index name
     * @param filter - An object containing the search criteria.
     * @returns A promise resolving to an array of semantically matching documents.
     */
    async searchBySemantic(indexName: string, filter: SearchEmbeddedDocumentDto): Promise<SearchResultDto[]> {
        const response = await this.client.search({
            index:indexName,
            query: {
                bool: {
                filter: [
                    {
                    term: {
                        documentId: filter.documentId
                    }
                    },
                    {
                    script_score: {
                        query: {
                        match_all: {}
                        },
                        script: {
                            source: "cosineSimilarity(params.query_vector, doc['embedding']) + 1.0",
                            params: {
                                    query_vector: filter.embedding 
                                }
                        }
                    }
                    }
                ]
                }
            }
        });
        return response.hits.hits.map((hit: any) => hit._source);
    }

    /**
     * Indexes a single page of a document into Elasticsearch.
     * @param indexName - The index name
     * @param document - An object representing the page content and metadata.
     * @returns A promise resolving when the indexing operation is complete.
     */
    async indexContent(indexName: string, document: IndexedDocumentDto): Promise<void> {

        //First of all check if index exists
        const exists = await this.client.indices.exists({ index: indexName });
        if(!exists){
            console.log(`The index not exists yet: ${indexName}.`,);
            await this.createIndexWithMapping(indexName, this.embeddingDims);
        }

        //Then try to go ahead
       const result =  await this.client.index({
            index:indexName,
            body: document 
        });
    }

    async createIndexWithMapping(indexName: string, embeddingDims: number ) {
        const mapping = {
            mappings: {
                properties: {
                    documentId: { type: 'integer' },
                    documentName: { type: 'text' },
                    pageNumber: { type: 'integer' },
                    content: { type: 'text' },
                    embedding: { 
                        type: 'dense_vector',
                        dims: embeddingDims,
                    }
                }
            }
        };
    
        try {
             await this.client.indices.create({
                index: indexName,
                body: mapping
            }  as any);
        } catch (error) {
            console.error('Error creating index:', error);
        }
    }
}
