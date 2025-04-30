import { ChatCompletatioDto } from "domain/dtos/chat-completation";

export interface IGptTextAdapter {
    getEmbedding(text: string): Promise<number[]>;
    getResponse(messages: ChatCompletatioDto[]): Promise<string | undefined>
}
