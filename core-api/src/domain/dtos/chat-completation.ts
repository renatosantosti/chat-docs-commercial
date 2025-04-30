export type ChatCompletatioDto = {
    role: "function" | "developer" | "system" | "user" | "assistant" | "tool";
    content: string;
}
