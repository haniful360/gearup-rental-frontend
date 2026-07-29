// types/chat.ts
export interface TeamMember {
  id: string;
  email: string;
  firstName: string;
  lastName: string | null;
  fullName: string;
  avatarUrl: string | null;
  status: string;
  teamRole: string;
}

export interface ReadReceipt {
  userId: string;
  readAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  readReceipts: ReadReceipt[];
  createdAt: string;
}

export interface TypingPayload {
  userId: string;
  isTyping: boolean;
}

export interface MessageReadPayload {
  messageId: string;
  userId: string;
  readAt: string;
}
