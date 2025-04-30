import IPasswordHashAdapter from 'application/interfaces/adapters/password-hashing';
import ITimeAdapter from 'application/interfaces/adapters/time-provider';
import IBaseMapper from 'application/interfaces/base/base-mapper';
import DocumentDto from 'domain/dtos/document';
import UserDto from 'domain/dtos/user';
import User from 'domain/models/user';
import PasswordHashAdapter from 'infrastructure/adapters/password-hash-adapter';
import TimeProvider from 'infrastructure/adapters/time-provider-adapter';
import { DocumentMapper } from 'mappers/document-mapper';
import { UserMapper } from 'mappers/user-mapper';
import { container } from 'tsyringe'
import Document from 'domain/models/document';
import IUserRepository from 'application/interfaces/repositories/user';
import UserRepository from 'persistence/user-repository';
import IDocumentRepository from 'application/interfaces/repositories/document';
import DocumentRepository from 'persistence/document-repository';
import { DocumentEntityMapper } from 'infrastructure/database/mappers/document-entity-to-model';
import DocumentEntity from 'infrastructure/database/entities/document';
import UserEntity from 'infrastructure/database/entities/user';
import { UserEntityMapper } from 'infrastructure/database/mappers/user-entity-to-model';
import GetDocumentController from 'presentation/controllers/document/get-document-controller';
import GetUserController from 'presentation/controllers/user/get-user-controller';
import UpdateUserController from 'presentation/controllers/user/update-user-controller';
import CreateDocumentController from 'presentation/controllers/document/create-document-controller';
import DeleteDocumentController from 'presentation/controllers/document/delete-document-controller';
import GetAllDocumentController from 'presentation/controllers/document/get-all-document-controller';
import UpdateDocumentController from 'presentation/controllers/document/update-document-controller';
import { ICreateDocumentUseCase } from 'application/interfaces/use-cases/create-document-usecase-interface';
import CreateDocumentUseCase from 'application/usecases/document/create-document/create-document-usecase';
import { IDeleteDocumentUseCase } from 'application/interfaces/use-cases/delete-document-usecase-interface';
import { IGetAllDocumentUseCase } from 'application/interfaces/use-cases/get-all-document-usecase-interface';
import { IGetDocumentUseCase } from 'application/interfaces/use-cases/get-document-usecase-interface';
import { IUpdateDocumentUseCase } from 'application/interfaces/use-cases/update-document-usecase-interface';
import DeleteDocumentUseCase from 'application/usecases/document/delete-document/delete-document-usecase';
import GetAllDocumentUseCase from 'application/usecases/document/get-all-document/get-all-document-usecase';
import GetDocumentUseCase from 'application/usecases/document/get-document/get-document-usecase';
import UpdateDocumentUseCase from 'application/usecases/document/update-document/update-document-usecase';
import { ICreateUserUseCase } from 'application/interfaces/use-cases/create-user-usecase-interface';
import CreateUserUseCase from 'application/usecases/user/create-user/create-user-usecase';
import { IGetUserUseCase } from 'application/interfaces/use-cases/get-user-usecase-interface';
import GetUserUseCase from 'application/usecases/user/get-user/get-user-usecase';
import UpdateUserUseCase from 'application/usecases/user/update-user/update-user-usecase';
import { IUpdateUserUseCase } from 'application/interfaces/use-cases/update-user-usecase-interface';
import CreateUserController from 'presentation/controllers/user/create-user-controller';
import AuthController from 'presentation/controllers/auth';
import AuthUseCase from 'application/usecases/auth/auth-usecase';
import LiveUseCase from 'application/usecases/live/use-case';
import ILiveUseCase from 'application/interfaces/use-cases/live-usecase-interface';
import { PDFDocumentAdapter } from 'infrastructure/adapters/pdf-document-adapter';
import { ExtractDocumentTextPagesService } from 'application/services/extract-document-text-pages-service';
import IAuthUseCase from 'application/interfaces/use-cases/auth-usecase-interface';
import { SearchIndexerService } from 'application/services/indexer-pages-service';
import OpenAIGptTextAdapter from 'infrastructure/adapters/open-ai-gpt-text-adapter';
import { SlasticSearchIndexer } from 'infrastructure/adapters/slastic-search-indexer-adapter';
import { elasticSearchConfig, openAiApiConfig } from 'config';
import { OpenAIChatEnumModels, OpenAIEmbeddingModels } from 'presentation/helpers/openai-embedding-models';
import { IChatDocUseCase } from 'application/interfaces/use-cases/chatdoc-usecase-interface';
import { ISearchTermUseCase } from 'application/interfaces/use-cases/search-usecase-interface';
import ChatDocUseCase from 'application/usecases/chatdoc/chatdoc-usecase';
import SearchTermUseCase from 'application/usecases/search/search-usecase';
import SearchTermController from 'presentation/controllers/search/search-term-controller';
import ChatDocController from 'presentation/controllers/chat-doc/chat-doc-controller';

/* Register all adapters as singletons*/
container.registerSingleton<ITimeAdapter>('ITimeAdapter', TimeProvider);
container.registerSingleton<IPasswordHashAdapter>('IPasswordHashAdapter', PasswordHashAdapter);

/* Register all mappers */
const userMapper =  new UserMapper();
const documentMapper = new DocumentMapper();
const userEntityMapper = new UserEntityMapper();
const documentEntityMapper = new DocumentEntityMapper();
container.registerInstance<IBaseMapper<User, UserDto>>('UserMapper', userMapper);
container.registerInstance<IBaseMapper<Document, DocumentDto>>('DocumentMapper', documentMapper);
container.registerInstance<IBaseMapper<User, Partial<UserEntity>>>('UserEntityMapper', userEntityMapper);
container.registerInstance<IBaseMapper<Document, Partial<DocumentEntity>>>('DocumentEntityMapper', documentEntityMapper);

/* Register all repositories */
container.registerInstance<IUserRepository>('IUserRepository', new UserRepository(container.resolve<IBaseMapper<User, Partial<UserEntity>>>('UserEntityMapper')));
container.registerInstance<IDocumentRepository>('IDocumentRepository', new DocumentRepository(container.resolve<IBaseMapper<Document, Partial<DocumentEntity>>>('DocumentEntityMapper')));

// /* Register all controllers for user */
// container.register("GetUserController", {useClass: GetUserController,});
// container.register("GetAllDocumentController", {useClass: GetAllDocumentController,});
// container.register("CreateDocumentController", {useClass: CreateDocumentController,});
// container.register("UpdateDocumentController", {useClass: UpdateDocumentController,});
// container.register("DeleteDocumentController", {useClass: DeleteDocumentController,});

/* Shared instances */
const timeProvider = container.resolve<ITimeAdapter>('ITimeAdapter');
const passwordHash = container.resolve<IPasswordHashAdapter>('IPasswordHashAdapter');

/* Register all usecases for user*/
const userRepository =  container.resolve<IUserRepository>('IUserRepository');

const createUserUseCase =  new CreateUserUseCase(timeProvider,userRepository,passwordHash, userMapper);
const getUserUseCase =  new GetUserUseCase(timeProvider,userRepository,userMapper);
const updateUserUseCase =  new UpdateUserUseCase(timeProvider,userRepository,passwordHash, userMapper);

container.registerInstance<ICreateUserUseCase>('ICreateUserUseCase',createUserUseCase);
container.registerInstance<IGetUserUseCase>('IGetUserUseCase', getUserUseCase);
container.registerInstance<IUpdateUserUseCase>('IUpdateUserUseCase', updateUserUseCase);

/* Register all usecases for document*/

    // Set param requirements
const documentRepository = container.resolve<IDocumentRepository>('IDocumentRepository');
const openAiAdaptter =  new OpenAIGptTextAdapter(openAiApiConfig.apiKey, openAiApiConfig.chatModel as OpenAIChatEnumModels );
const slasticSearchIndexer = new SlasticSearchIndexer(elasticSearchConfig.host, elasticSearchConfig.port,elasticSearchConfig.user, elasticSearchConfig.password, openAiApiConfig.embeddingDims);
const pdfDocService =  new ExtractDocumentTextPagesService(new PDFDocumentAdapter());
const searchIndexerService =  new SearchIndexerService(elasticSearchConfig.indexName, openAiAdaptter, slasticSearchIndexer)

//Finally, create all uses cases and register those instances
const createDocumentUseCase = new CreateDocumentUseCase(timeProvider, documentRepository, documentMapper, pdfDocService, searchIndexerService);
const deleteDocumentUseCase = new DeleteDocumentUseCase(timeProvider, documentRepository, documentMapper);
const getAllDocumentUseCase = new GetAllDocumentUseCase(timeProvider, documentRepository, documentMapper);
const getDocumentUseCase = new GetDocumentUseCase(timeProvider, documentRepository, documentMapper);
const updateDocumentUseCase = new UpdateDocumentUseCase(timeProvider, documentRepository, documentMapper);
const chatDocUseCase = new ChatDocUseCase(timeProvider, documentRepository, openAiAdaptter, slasticSearchIndexer);
const searchTermUseCase = new SearchTermUseCase(timeProvider, documentRepository, slasticSearchIndexer, elasticSearchConfig.indexName);

container.registerInstance<ICreateDocumentUseCase>('ICreateDocumentUseCase', createDocumentUseCase);
container.registerInstance<IDeleteDocumentUseCase>('IDeleteDocumentUseCase', deleteDocumentUseCase);
container.registerInstance<IGetAllDocumentUseCase>('IGetAllDocumentUseCase', getAllDocumentUseCase);
container.registerInstance<IGetDocumentUseCase>('IGetDocumentUseCase', getDocumentUseCase);
container.registerInstance<IUpdateDocumentUseCase>('IUpdateDocumentUseCase', updateDocumentUseCase);

/* Register usecase for searching and chatting */
container.registerInstance<IChatDocUseCase>('IChatDocUseCase', chatDocUseCase);
container.registerInstance<ISearchTermUseCase>('ISearchTermUseCase', searchTermUseCase);

/* Register usecase check live controller */
const authUserRepository = container.resolve<IUserRepository>('IUserRepository');
const authUseCase = new AuthUseCase(timeProvider, authUserRepository, passwordHash);
container.registerInstance<IAuthUseCase>('IAuthUseCase', authUseCase);


/* Register usecase for authentication */
const liveUseCase = new LiveUseCase();
container.registerInstance<ILiveUseCase>('ILiveUseCase', liveUseCase);

/* Register all controllers for user */
container.register("CreateUserController", {useClass: CreateUserController,});
container.register("GetUserController", {useClass: GetUserController,});
container.register("UpdateUserController", {useClass: UpdateUserController,});

/* Register all controllers for document */
container.register("GetDocumentController", {useClass: GetDocumentController,});
container.register("GetAllDocumentController", {useClass: GetAllDocumentController,});
container.register("CreateDocumentController", {useClass: CreateDocumentController,});
container.register("UpdateDocumentController", {useClass: UpdateDocumentController,});
container.register("DeleteDocumentController", {useClass: DeleteDocumentController,});

/* Register authentication controller */
container.register("AuthController", {useClass: AuthController,});

/* Register check live controller */
container.register("LiveController", {useClass: AuthController,});


/* Register search  term controller*/
container.register("SearchTermController", {useClass: SearchTermController,});

/* Register chat with document controller */
container.register("ChatDocController", {useClass: ChatDocController,});
