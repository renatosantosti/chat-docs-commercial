import { IGptTextAdapter } from "@/application/interfaces/adapters/gpt-adapter";
import { injectable, singleton } from "tsyringe";
import OpenAI from "openai";
import {
  OpenAIChatEnumModels,
  OpenAIEmbeddingEnumModels,
  OpenAIEmbeddingModels,
} from "@/presentation/helpers/openai-embedding-models";
import { ChatCompletatioDto } from "@/domain/dtos/chat-completation";
/**
 * Class that implements the IGptTextAdapter interface to provide generative ai resource.
 */
@injectable()
@singleton()
export default class OpenAIGptTextAdapter implements IGptTextAdapter {
  private client: OpenAI | null;
  private chatModel: string;
  private embeddingModel: string;
  private temperature: number;
  private maxTokens: number;
  constructor(
    openAiKey: string,
    chatModel: OpenAIChatEnumModels = OpenAIChatEnumModels.GPT4Turbo,
    chatTemperature: number = 0.7,
    embeddingModel: OpenAIEmbeddingEnumModels = OpenAIEmbeddingEnumModels.ADA002,
    maxTokens: number = 500,
  ) {
    this.chatModel = chatModel;
    this.embeddingModel = embeddingModel;
    this.temperature = chatTemperature;
    this.maxTokens = maxTokens;
    this.client = null;
    try {
      this.client = new OpenAI({
        apiKey: openAiKey,
      });
    } catch (error: any) {
      console.error("Error to connect on Gpt Provider:", { error });
      throw new Error("Error to connect on Gpt Provider");
    }
  }

  async getEmbedding(text: string): Promise<number[]> {
    if (!this.client) {
      throw new Error("Gpt Provider is not connected.");
    }
    // Generate embedding using OpenAI
    try {
      const embeddingResponse = await this.client.embeddings.create({
        model: this.embeddingModel,
        input: text,
      });

      const embeddings = embeddingResponse.data[0].embedding;
      return embeddings;
    } catch (error: any) {
      throw new Error("Unknow error to get embedding by gpt provider.");
    }
  }

  async getResponse(
    messages: ChatCompletatioDto[],
  ): Promise<string | undefined> {
    if (!this.client) {
      throw new Error("Gpt Provider is not connected.");
    }

    const params: OpenAI.Chat.ChatCompletionMessageParam[] = messages as any;

    const completion = await this.client.chat.completions.create({
      model: this.chatModel,
      messages: params,
      temperature: this.temperature,
      max_tokens: this.maxTokens,
    });

    console.log("Gpt response:", completion);
    return completion.choices[0].message.content?.trim();
  }
}
