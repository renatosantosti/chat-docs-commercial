import express from "express";
import { container } from "tsyringe";
import HttpStatusCode from "@/presentation/helpers/http-status";
import { InternalError } from "@/shared/errors";
import GetDocSuggestionsController from "@/presentation/controllers/document/get-document-suggestions-controller";
import GetDocumentSuggestionsRequest from "@/application/interfaces/use-cases/document/get-suggestions/get-document-suggestions-request";

// Create route
const suggestionsDocRouters = express.Router();

/**
 * @openapi
 * /suggestions/document-creation:
 *   post:
 *     summary: Suggests document creation based on provided content sample and file name
 *     tags:
 *       - Document Suggestions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 description: The name of the file for which suggestions are being requested.
 *                 example: "example.txt"
 *               contentSample:
 *                 type: string
 *                 description: A sample of the document content to base suggestions on.
 *                 example: "This document is about..."
 *             required:
 *               - fileName
 *               - contentSample
 *     responses:
 *       200:
 *         description: Suggestions generated successfully
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
 *                   description: The generated suggestions.
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
suggestionsDocRouters.post(
  "/suggestions/document-creation",
  async (req: any, res: any) => {
    try {
      // Resolve the use case and controller from the container
      const controller = container.resolve(
        "GetDocSuggestionsController",
      ) as GetDocSuggestionsController;

      // Build the new search object from the request body, ensuring undefined values are handled properly
      const request: GetDocumentSuggestionsRequest = {
        fileName: req.body?.fileName,
        contentSample: req.body?.contentSample,
      };

      // Execute the controller handler and pass the new search object as part of the request
      const response = await controller.handler(request);

      // Return the response from the handler, including status code and content
      return res.status(response.statusCode).send(response);
    } catch (err: any) {
      // Handle unknown errors and log them with additional context
      console.error("Unknown Internal Error", {
        details: {
          method: "POST",
          route: "/suggestions/document-creation",
          error: { ...err },
        },
      });

      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(new InternalError("Unknown Internal Error"));
    }
  },
);
export default suggestionsDocRouters;
