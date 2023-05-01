import { MessageArraySchema } from "../../../lib/validators/message";
// import { MessageArraySchema } from "@/lib/validators/message";

import { ChatGPTMessage } from "../../../lib/openai-stream";
// import { ChatGPTMessage } from "@/lib/openai-stream";

import { chatbotPrompt } from "../../../app/helpers/constants/chatbot-prompt";
// import { chatbotPrompt } from "@/app/helpers/constants/chatbot-prompt";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const parseMessages = MessageArraySchema.parse(messages);

  const outboundMessages: ChatGPTMessage[] = parseMessages.map((message) => ({
    role: message.isUserMessage ? "user" : "system",
    content: message.text,
  }));

  outboundMessages.unshift({
    role: "system",
    content: chatbotPrompt,
  });
}
