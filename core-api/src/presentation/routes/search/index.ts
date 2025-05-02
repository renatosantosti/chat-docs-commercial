import express from "express";
import onlyWithAccessAuthMiddleware from "@/presentation/http-middlewares/only-access-auth";
import { container } from "tsyringe";
import HttpStatusCode from "@/presentation/helpers/http-status";
import SearchTermController from "@/presentation/controllers/search/search-term-controller";
import SearchTermRequest from "@/application/usecases/search/search-request";
import { InternalError } from "@/shared/errors";

// Create route
const searchRouters = express.Router();

/**
 * @openapi
 * /search:
 *   post:
 *     summary: Creates a new search based on text term
 *     tags:
 *       - Search
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mode:
 *                 type: string
 *                 enum:
 *                   - documents
 *                   - pages
 *                 description: The mode of the search. "documents" searches pages from all documents, while "pages" searches specific document.
 *               term:
 *                 type: string
 *                 description: The search term to look for.
 *               documentId:
 *                 type: number
 *                 description: The ID of the document. Required when mode is "pages".
 *             required:
 *               - mode
 *               - term
 *     responses:
 *       200:
 *         description: Search executed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: The search results.
 *       400:
 *         description: Bad request, validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input data
 *       403:
 *         description: Access forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access forbidden
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Resource not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
searchRouters.post(
  "/search/",
  onlyWithAccessAuthMiddleware,
  async (req: any, res: any) => {
    try {
      // Resolve the use case and controller from the container
      const controller = container.resolve(
        "SearchTermController",
      ) as SearchTermController;

      // Build the new search object from the request body, ensuring undefined values are handled properly
      const request: SearchTermRequest = {
        mode: req.body?.mode,
        term: req.body?.term,
        documentId: req.body?.documentId,
      };

      // Execute the controller handler and pass the new search object as part of the request
      const response = await controller.handler(req.currentUser!, request);

      // Return the response from the handler, including status code and content
      return res.status(response.statusCode).send(response);
    } catch (err: any) {
      // Handle unknown errors and log them with additional context
      console.error("Unknown Internal Error", {
        details: { method: "POST", route: "/search/", error: { ...err } },
      });

      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(new InternalError("Unknown Internal Error"));
    }
  },
);
export default searchRouters;
