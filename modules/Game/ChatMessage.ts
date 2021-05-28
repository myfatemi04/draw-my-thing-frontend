import * as immutable from "immutable";

export interface ChatMessageProps {
  timestamp: number;
  senderID: string;
  senderNickname: string;
  content: string;
}

class ChatMessage extends immutable.Record<ChatMessageProps>({
  timestamp: 0,
  senderID: "",
  senderNickname: "",
  content: "",
}) {}

export default ChatMessage;
