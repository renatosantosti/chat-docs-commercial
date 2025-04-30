import express from "express";
import LiveController from "../../controllers/live";
import { container } from "tsyringe";

const liveCheckRouter = express.Router();

/**
 * @openapi
 * /live:
 *   get:
 *     tags:
 *       - Live Check
 *     description: Just inform if api server is live
 *     responses:
 *       200:
 *         description: Returns true if api is ready.
 */
liveCheckRouter.get("/live", async (_req, res) => {
  const controller = container.resolve(LiveController);
  const response = await controller.handler();
  return res.send(response);
});

export default liveCheckRouter;