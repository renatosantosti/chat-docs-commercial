# Chat - Docs
###  This project aims to provider an easy and friendly Ai-Driven application to manager files and chat with them.

Chat with your PDF documents using AI superpowers.

To enhance user´s experience it was implemented a beatyfull start pege invite users to sigh-in this app.

Furthermore, this frontend application implements a modern user-friendly interface to consume all services from rest-api.

### Stack applied on this project:
- Vite: https://vite.dev/
- Radix: https://www.radix-ui.com/
- Saga-Redux: https://redux-saga.js.org/
- Redux-tookit: https://redux-toolkit.js.org/
- React-Router: https://reactrouter.com/
- and some other minors opensources contributions.

### Resources integrated to Rest-API
- login (before that, please create new account by POSTMAN/Swagger)
- search term on specific document
- chat with on specific document

### Mocked resources
Most of these services were implemented on Rest API but not connected on UI to be consumed as supposed to. But you can experience how it works by mocked data.

- filter documents (it works without api) - (implemented on api POST: /search)
- upload file (implemented on api POST: /documents)
- Download full document(implemented on api GET: /documents) - a base64 pdf will be provided.
- Delete file (implemented on api DELETE: /documents/:id)
- Edit file (implemented on api PUT: /documents/:id) - not implement this form, only delete button is displayed on gridview documents
- Generate document´s name and description by AI tools -  only mocked on UI.

### How to up this service?
We advice you up this project by root folder of mono repo, so you should hands-on by Docker Compose, that way make assure you start up all dependencies.

### Disclaimers 
 At this moment some features were implemented and other were mocked, so some feature were not integrated with api. But be happy - I worked a lot to provider all ui behaviors need - so it is required a litle bit more hard-work to complete connect all interfaces on rest api.