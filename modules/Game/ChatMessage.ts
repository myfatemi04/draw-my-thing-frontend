import * as immutable from "immutable";

export interface ChatMessageProps {
  senderID: string;
  content: string;
}

class ChatMessage extends immutable.Record<ChatMessageProps>({
  senderID: "",
  content: "",
}) {}

export default ChatMessage;
