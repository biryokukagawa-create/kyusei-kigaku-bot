export type MessageRole = "user" | "assistant";

export type Message = {
  role: MessageRole;
  content: string;
};

export type ChatRequest = {
  messages: Message[];
  honmeiStarName: string;
};

export type ChatResponse = {
  content: string;
};
