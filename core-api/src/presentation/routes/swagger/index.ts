import express from "express";

const swaggerRouter = express.Router();

// define swagger route to the Swagger page for api documentation
swaggerRouter.get("/", (_, res) => {
  res.redirect("/api-docs");
});

export default swaggerRouter;
