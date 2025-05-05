# Chat - Docs

### This project aims to provider an easy and friendly Ai-Driven application to manager files and chat with them.

Chat with your PDF documents using AI superpowers

This REST API was develop ever my another project called TS-Clean-Archicteture-Rest-API-Boilerplate but
as clean code strategy some enhancement were done here, soon I will apply there as well. Feel free to colaborate that project - https://github.com/renatosantosti/TS-Clean-Architecture-Rest-APi-Boilerplate

Stack applied on this project:

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
- Sqlite - mocked database
- Jest

AI Driven Stack:

- OpenAI API - to generate vector db embedding and to create insights and finds during chat conversation
- Elastic Search - for index document pages and semantic search - vector database was used to.
- Kibana - used as UI to manage Elastic Search

## MVC

For more information about MVC proposal, please read the README.md on root path of mono repo - [click here](../README.md)

## Features

- Manage Users
- Manage Auth & JWT Token generate - exception refresh token yet
- Manage documents & pages
- Index Document on Elastic by text´s terms and semantically via Vector Embeddings
- Search by terms
- Search semantincally
- Chat with document - AI Driven Resource
- Avoid chatting something out of document´s context

## Low coupling and high cohesion

- Applied S.O.L.I.D principles and Clean Archicteture
- Any dependencies could be replaced by another implementations
- External resources could be replaced easily
- Services and adapter can be moved out this solution as microservice since interface had been implemented and resource injected.
- Inversion of control was archive by container injection, so all resouce are injected on container and shared with app to injected/resolved when it is required;
- Singleton: some resource had a singleton instance to be injected as required
- Cohension: all application flow from domain & core application, also single responsability principle was followed to assure high cohension and easy manuntenability

## Tests and test converage

- All application is ready to 100% test coverage
- Some unit test was implementes as proof of abilities

## Docker and Containerization

- All services are ready to be containerized and deployed on one click
- State less principle was implemented on each rest end-point
- API and UI are ready to be scalable horizontally once app do not depends on disk, memory state or any else.

## Getting Started

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

## Up all environment using docker container

Alternativelly you can start all services using Docker by docker-compose.yml

```sh
docker compose -f 'docker-compose.yml' up -d --build
```

ATTENTION: ignore other docker-compose.yml files within other folders if you don´t want start up each services manually.

## Generate ElasticSearch Token be used by Kibana

Before start all environment you need to make assure ElasticSearch has a volume to save its state also, start ElasticSearch container to create a token to used by Kibana.

Next run command to create ElasticSearch password for all accounts, here you will got elastic account and its password to authentication kibana portal:

```sh
docker exec -it elasticsearch bin/elasticsearch-setup-passwords interactive
```

Then, finally create token to connect Kibana on ElasticSearch services - this token is used on server-to-server communincation elasticsearch x kibna:

```sh
docker exec -it elasticsearch bin/elasticsearch-service-tokens create elastic/kibana kibana-token
```

Copy that generated token and change you docker-compose.yml on Kibana section environment variables set: ELASTICSEARCH_SERVICEACCOUNTTOKEN with that generated token.

if you need to see Kibana´s log run:

```sh
docker logs kibana
```

## Contributors

| Used Projects | Link                                                      |
| ------------- | --------------------------------------------------------- |
| TypeScript    | https://www.typescriptlang.org                            |
| Express       | https://expressjs.com                                     |
| Swagger       | https://swagger.io                                        |
| Swagger-JsDoc | https://github.com/Surnet/swagger-jsdoc                   |
| TSoa          | https://github.com/lukeautry/tsoa                         |
| Morgan        | https://expressjs.com/en/resources/middleware/morgan.html |
| Docker        | https://docs.docker.com                                   |

Additionally read about **JSDoc 3** is an API documentation generator for JavaScript, similar to Javadoc or phpDocumentor: https://swagger.io/specification

And also the **OpenAPI Specification (OAS)** defines a standard, language-agnostic interface to HTTP APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic: https://swagger.io/specification

## License

MIT
