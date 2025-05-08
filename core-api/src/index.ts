import * as path from "path";
import "module-alias/register";

const moduleAlias = require("module-alias");
moduleAlias.addAliases({
  "@": path.join(__dirname),
});
// if (process.env.NODE_ENV === "development") {
//   const moduleAlias = require("module-alias");
//   moduleAlias.addAliases({
//     "@": path.join(__dirname),
//   });
// }

import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import liveCheckRouter from "@/presentation/routes/live";
import authRouter from "@/presentation/routes/auth";
import { serverConfig } from "./config";
import dbContext from "@/infrastructure/database/sequelize";
import userRouters from "@/presentation/routes/user";
import documentRouters from "@/presentation/routes/document";
import "@/infrastructure/container/config";
import chatDocRouters from "@/presentation/routes/chat-doc";
import searchRouters from "@/presentation/routes/search";
import swaggerRouter from "@/presentation/routes/swagger";

const PORT = serverConfig.apiPort || 8000;

const app: Application = express();

// Enable CORS
/* TODO: get host from env */
app.use(
  cors({
    origin: [
      "http://127.0.0.1:8080",
      "http://localhost:4173",
      "http://localhost:8080",
      "http://ui:8080",
      `http://${serverConfig.api_client_host}`,
      `https://${serverConfig.api_client_host}`,
    ], // Allow requests from your React app
    credentials: true, // Allow cookies to be sent with requests
  }),
);
app.use(cookieParser()); // Use cookie-parser middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.static("public"));

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "ChatDocs -  API",
    version: "0.0.1",
    description:
      "A RESTful API for ChatDocs. This API was implemented in TypeScript using Express.js and Swagger. It follows the principles of Clean Architecture, focusing on separation of concerns and maintainability.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "Renato Santos",
      url: "https://github.com/renatosantosti/node-ts-swagger-boilerplate",
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        in: "header",
        name: "authorization",
        description: "Bearer Token",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions. It applied *.* to accept both .js and .ts extension for dev and after built the project.
  apis: [`**/*.ts`, `${__dirname}/presentation/routes/**/*.js`],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Define route to api documentation (swagger)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Apply all other routers
app.use(swaggerRouter);
app.use(liveCheckRouter);
app.use(authRouter);
app.use(userRouters);
app.use(documentRouters);
app.use(searchRouters);
app.use(chatDocRouters);

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});

dbContext.dbConnection
  .authenticate()
  .then(function (err) {
    console.log("Database connection has been established successfully.");
  })
  .catch(function (err) {
    console.error("Unable to connect to the database:", err);
  });
