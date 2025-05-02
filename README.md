# Chat - Docs
###  This project aims to provider an easy and friendly Ai-Driven application to manager files and chat with them.

Chat with your PDF documents using AI superpowers

This REST API was developed based on my another project called TS-Clean-Archicteture-Rest-API-Boilerplate but 
as clean code strategy some enhancement were done here. You must are free to colaborate on that project -  https://github.com/renatosantosti/TS-Clean-Architecture-Rest-APi-Boilerplate

### Stack applied on this project:
- TypeScript
- Express
- Swagger
- Swagger-UI-Express
- Swagger-JSDoc
- TSoa
- Morgan
- JWT
- BCrypt 
- DotEnv
- Docker
- Jest
- Sqlite  - mocked database

### AI Driven Stack:
 - OpenAI API - to generate vector db embedding and to create insights and finds during chat conversation
 - Elastic Search - for index document pages and semantic search - vector database was used to.
 - Kibana - used as UI to manage Elastic Search

### MVP
Here I will present main goals and backlogs that could be implemented on the future.

### Functional Requirements (user stories)
-  As user I need to sign-in and sign-out on ChatDocs.com
-  As non user I need to create my account and set my  image avatar
-  As user I want to edit my profile, reset my password and change my avatar image
-  As user I need to upload my documents and set its properties(details)
-  As user my documents will be available only to my account
-  As user I need to search term and find all documents have those terms
-  As user I can preview document sumarry before chat this document 
-  As user I want o chat with a specific document -  so I could ask somethinng about document context or ask for conclusions and etc.
-  As user I want o chat with a specific document -  so I could ask something about document context or ask for conclusions and etc.

-  When I am chatting with document, as an user I want search for terms and found all pages that have that term.

A wireframe was create to clarify that app behavior. It´s wireframe with first concept of this app, some stuffs are litle bit different on real application - [Click here](https://excalidraw.com/)

Also here you can see that wrireframe: [concept](documentation/about-concept.md) or [click here](documentation/image.png)

### Non-Functional Requirements
 - For that moment only .pdf files can be uploaded
 -  Authorization access by JWT token
 -  Only authenticaded users can access app and manage documents
 -  AI api should be agnositic and shift by another easily
 -  Documents should storage on no-relational database and /or cloud storage instead hard-disk
 -  Documents should be pre-processed and indexed to quick search term or AI works
 - Vector Databases should be used to delivery semantic search and avoid use AI for non-terms searchs
 - Implement core business api and microservices on server-to-server communication instead monolith application server
 - On frontend should be used React with UI framework such as ReactTrap or MUI,
 - Unit test should be applied for each uses cases, repositories, services and controllers
 - Integration tests should assure all services can work together
 - Ever as possible apply UI unit test
 - Use typescript instead pure(simple) JS on React(Frontend) or NodeJS(API)
 - For AI services that consume external resources -  AI provider could be a Python miroservices using FastAPI to provider rest api or 3rd partners, e.g: HuggingFace API, Anthropic, OpenAI/ChatGPT and etc.
 - ORM  should be used to access database on agnostic mode for NodeJS use Sequelize and for Python use SQL Alckmin
 - Perfomance test must assure upload files less 1 minute, each search should be less 10 seconds and AI responses less 2 minutes.

### Backlog:
-  As user I want to choose a folder for new uploaded document
-  As user I need to choose document list as folder or as gridview as well (view mode)
-  As user I want to create folder as move document to my folders
-  As user when I am within folder I want to delete document when I press delete key
-  As user I want to rename documents as I rename it on Windows 11 Folder
-  As user I need to star (favourite) certain documents and filter stared documents
-  As user I want to see history from my conversation with each document
-  As user I want create annotation for document pages and see it any time or delete it
-  As user I want upload other document format such as .doc, .dock, .pptx and .txt
-  As manager user i need dispacher ai requests for diferents provider to optmize my budget to this project - so, on demand I can route ai request to cheaper services by one click (on system setup - admin)

#### Solution Design

The software design was develop to maximize flexility to change any component as required without side-effect another parts of system - loose coupling. 


![alt text](/documentation/sofware-design.png)

Some S.O.L.I.D principles were implemented and also clean Architecture foundations, those approach ensure separation of concerns, scalability, and ease of maintenance. Below is the proposed folder structure:

```plaintext
src/
├── application/                # Application Layer
│   ├── interfaces/             # Interfaces for external systems
│   ├── services/               # Business logic services
│   ├── usecases/               # Specific use cases
├── config/                     # Configuration files
├── domain/                     # Domain Layer
│   ├── dtos/                   # Data Transfer Objects (DTOs)
│   ├── models/                 # Models or Entities
├── infrastructure/             # Infrastructure Layer
│   ├── mappers/                # Data mappers
│   ├── persistence/            # Database or storage-related code
│   ├── external-services/      # External API integrations
├── presentation/               # Presentation Layer
│   ├── controllers/            # Controllers for handling requests
│   ├── helpers/                # Utilities for presentation layer
│   ├── http-middlewares/       # HTTP-related middlewares
│   ├── routes/                 # Route definitions
│       └── auth/
│   └── views/                  # (Optional) Views or templates (if using a server-side rendered app)
├── shared/                     # Shared utilities, constants, or helpers
├── types/                      # Global TypeScript type definitions
└── index.ts                    # Main entry point
```

#### Folder Details

- **application/**: Contains the application layer logic, including interfaces, services, and use cases that interact with the `domain` layer.
- **config/**: Holds configuration files, such as environment settings or constants.
- **domain/**: Includes the core business logic of the application, such as entities (`models`) and data transfer objects (`dtos`).
- **infrastructure/**: Manages external dependencies, such as data mappers, database connections, and third-party services.
- **presentation/**: Handles the application’s presentation logic, including request controllers, routes, and helpers for HTTP communication.
- **shared/**: Contains utilities or constants shared across multiple layers.
- **types/**: Stores global TypeScript type definitions for type-checking consistency.
- **index.ts**: The main entry point of the application.

#### Benefits of Clean Architecture

1. **Separation of Concerns**:
   - Each layer is responsible for a specific functionality, making the code easier to maintain and extend.

2. **Scalability**:
   - You can add new features or modules without affecting other parts of the system.

3. **Testability**:
   - The decoupled design allows independent testing of each layer.

4. **Code Readability**:
   - Well-organized structure improves developer understanding and onboarding.


#### More information about UI (frontend app)
 - [Documentação da UI](ui/README.md)

#### More information about API
 - [Documentação da Core API](core-api/README.md)
 - For a full end-point documentation, please start Rest API and read OpenAPI documentation made over Swagger.


### Getting Started
To get started with TS-Clean-Architecture-Rest-APi-Boilerplate, follow these steps:

Clone the repository: 
```sh
    git clone github.com/renatosantosti/chat-docs.git
```
For folders UI and CORE-API, install dependencies: 
```sh 
npm install
```

To run locally you can start each service using (you must be within service´s folder): 
- ATTENTION: rest-api services depends on services: Elastic & Kibana, their host & ports should fill on .env
```sh 
npm run dev
```
ATTENTION:
 -  if you´re running services manually without docker compose you need to refer all domain as localhost, e.g: http://localhost:9200 
    otherwise that name wont work due those name exist only docker netword called chatdocsnetwork
- For example: switch http://elasticsearch:9200 to http://localhost:9200 if you´re local instance of Elastic Search out of containers(docker-compose has domain names for each sercices, e.g: elasticsearch exists only on docker's network)

## Starting all services at same time using Docker

Alternativelly you can start all services using Docker by docker-compose.yml

```sh 
docker compose -f 'docker-compose.yml' up -d --build
```

ATTENTION: ignore other docdocker-compose.yml within other folders if don´t want up services manually one-by-one.
#### Creating project 

## Generate ElasticSearch Token be used by Kibana
Before start all environment you need to make assure ElasticSearch has a volume to save its state also, start ElasticSearch container to create a token to used by Kibana.

Next run command to create ElasticSearch password for all accounts, here you will got elastic account and its password to authentication kibana portal:
```sh
docker exec -it elasticsearch bin/elasticsearch-setup-passwords interactive
```

Then, finally create token to connect Kibana on ElasticSearch services  - this token is used on server-to-server communincation elasticsearch x kibna: 
```sh
docker exec -it elasticsearch bin/elasticsearch-service-tokens create elastic/kibana kibana-token
```
Copy that generated token and change you docker-compose.yml on Kibana section environment variables set: ELASTICSEARCH_SERVICEACCOUNTTOKEN with that generated token. 

if you need to see Kibana´s logs you must run: 
```sh
docker logs kibana
```

## Base Contributors

| Used Projects | Link |
| ------ | ------ |
| TypeScript | https://www.typescriptlang.org |
| Express | https://expressjs.com |
| Swagger | https://swagger.io |
| Swagger-JsDoc | https://github.com/Surnet/swagger-jsdoc |
| TSoa | https://github.com/lukeautry/tsoa |
| Morgan | https://expressjs.com/en/resources/middleware/morgan.html|
| Docker | https://docs.docker.com |

Additionally read about **JSDoc 3** is an API documentation generator for JavaScript, similar to Javadoc or phpDocumentor: https://swagger.io/specification

And also the **OpenAPI Specification (OAS)** defines a standard, language-agnostic interface to HTTP APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic: https://swagger.io/specification

## License
MIT
