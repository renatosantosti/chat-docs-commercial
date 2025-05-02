export enum OpenAIChatEnumModels {
  ChatGPT35Turbo = "gpt-3.5-turbo",
  GPT4 = "gpt-4",
  GPT4Turbo = "gpt-4-turbo",
}

export enum OpenAIEmbeddingEnumModels {
  ADA001 = "text-embedding-ada-001",
  ADA002 = "text-embedding-ada-002",
  CURIE001 = "text-embedding-curie-001",
  BABBAGE001 = "text-embedding-babbage-001",
}

export interface OpenAIEmbeddingModel {
  modelName: string; // The name of the model
  dims: number; // The embedding dimension length
}

export const OpenAIEmbeddingModels: Record<string, OpenAIEmbeddingModel> = {
  "text-embedding-ada-001": { modelName: "text-embedding-ada-001", dims: 1024 },
  "text-embedding-ada-002": { modelName: "text-embedding-ada-002", dims: 1536 },
  "text-embedding-curie-001": {
    modelName: "text-embedding-curie-001",
    dims: 12288,
  },
  "text-embedding-babbage-001": {
    modelName: "text-embedding-babbage-001",
    dims: 2048,
  },
};
