import { MessageArraySchema } from "../../../lib/validators/message";
// import { MessageArraySchema } from "@/lib/validators/message";

import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from "../../../lib/openai-stream";
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

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: outboundMessages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 150,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
