import express from "express";
import onlyWithAccessAuthMiddleware from "presentation/http-middlewares/only-access-auth";
import { container } from "tsyringe";
import HttpStatusCode from "presentation/helpers/http-status";
import { InternalError } from "shared/errors";
import ChatDocController from "presentation/controllers/chat-doc/chat-doc-controller";
import ChatDocRequest from "application/usecases/chatdoc/chatdoc-request";

// Create route
const chatDocRouters = express.Router();

/**
 * @openapi
 * /chat-doc:
 *   post:
 *     summary: Creates a new chat based on a document and the latest filter
 *     tags: 
 *       - Chat with Document Pages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               documentId:
 *                 type: number
 *                 description: The ID of the document to chat about.
 *                 example: 123
 *               question:
 *                 type: string
 *                 description: The question to ask about the document.
 *                 example: "What is the summary of this document?"
 *               previousQuestion:
 *                 type: string
 *                 description: The previous question asked in the chat (if any).
 *                 example: "What is the main topic of this document?"
 *               previousResponse:
 *                 type: string
 *                 description: The response to the previous question (if any).
 *                 example: "The document discusses climate change."
 *             required:
 *               - documentId
 *               - question
 *     responses:
 *       200:
 *         description: Chat executed successfully
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
 *                   description: The chat response.
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
chatDocRouters.post("/chat-doc/", onlyWithAccessAuthMiddleware, async (req:any, res:any) => {
  try {

    // Resolve the use case and controller from the container
    const controller = container.resolve("ChatDocController") as ChatDocController;

    // Build the new search object from the request body, ensuring undefined values are handled properly
    const request: ChatDocRequest = {
        documentId: req.body?.documentId,
        question: req.body?.question,
        previousQuestion: req.body?.previousQuestion,
        previousResponse: req.body?.previousResponse,
    };

    // Execute the controller handler and pass the new search object as part of the request
    const response = await controller.handler(req.currentUser!, request);

    // Return the response from the handler, including status code and content
    return res
      .status(response.statusCode)
      .send(response);

  } catch (err: any) {
    // Handle unknown errors and log them with additional context
    console.error("Unknown Internal Error", { details: {method:"POST" ,route: "/chat-doc/", error: { ...err } } });

    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(new InternalError("Unknown Internal Error"));
  }
});
export default chatDocRouters;
