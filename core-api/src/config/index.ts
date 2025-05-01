import dotenv from "dotenv";
import path from "path";
import { OpenAIChatEnumModels, OpenAIEmbeddingEnumModels, OpenAIEmbeddingModels } from "presentation/helpers/openai-embedding-models";

const envPath = path.resolve(__dirname, process.env.NODE_ENV === 'production' 
                                                                    ? `../../.env`
                                                                    : `../../.env.development`);

dotenv.config({
  path: envPath,
});

export type databaseDialect = "sqlite" | "sqliteMemory" | "mysql" | "mssql";

export const authConfig = {
  secret: String(process.env.TOKEN_SECRET),
  saltRounds: Number(process.env.TOKEN_SALT),
  expires: String(process.env.TOKEN_EXPIRES_IN),
};

export const serverConfig = {
  node_env: process.env.NODE_ENV,
  apiPort: process.env.API_PORT ? Number(process.env.API_PORT) : 8000,
  socketPort: process.env.SOCKET_PORT ? Number(process.env.SOCKET_PORT) : 9000,
}

export const databaseConfig = {
  dbDialect: (process.env.DB_DIALECT ?? "sqliteMemory") as databaseDialect,
  dbPort: process.env.DB_PORT ? Number(process.env.DB_PORT) : 1234,
  dbHost: process.env.DB_HOST ?? '',
  dbName: process.env.DB_NAME ?? '',
  dbUser: process.env.DB_USER ?? '',
  dbPassword: process.env.DB_PASSWORD ?? '',
  addModels: process.env?.ADD_MODELS ?? true,
}
const embeddingModel = (!!process.env.OPENAI_EMBEDDING_MODEL 
    ?   process.env.OPENAI_EMBEDDING_MODEL
    : OpenAIEmbeddingEnumModels.ADA002) as OpenAIEmbeddingEnumModels;
    
export const openAiApiConfig = {
  apiKey: process.env.OPENAI_API_KEY ?? '',
  chatModel: process.env.OPENAI_CHAT_MODEL ?? OpenAIChatEnumModels.GPT4Turbo,
  embeddingModel,
  embeddingDims: OpenAIEmbeddingModels[embeddingModel].dims,
  maxTokens: process.env.OPENAI_EMBEDDING_MAX_TOKEN ? Number(process.env.OPENAI_EMBEDDING_MAX_TOKEN) : 1000,
  embeddingModelTemperature: process.env.OPENAI_EMBEDDING_TEMPETURE ? Number(process.env.OPENAI_EMBEDDING_TEMPETURE) : 0.7,
  chatTemperature: process.env.OPENAI_EMBEDDING_TEMPETURE ? Number(process.env.OPENAI_CHAT_TEMPETURE) :  0.7,
}

export const elasticSearchConfig = {
  host: process.env.ELASTICSEARCH_HOST ?? '',
  port: process.env.ELASTICSEARCH_PORT ? Number(process.env.ELASTICSEARCH_PORT) : 9200,
  apiKey: process.env.ELASTICSEARCH_KEY ?? '',
  indexName: process.env.ELASTICSEARCH_INDEX_NAME ?? '',
  user: process.env.ELASTICSEARCH_USER ?? 'elastic',
  password: process.env.ELASTICSEARCH_PASSWORD ?? '',
}