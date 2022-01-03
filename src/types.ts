export type MessageType = {
  id?: number,
  content: string,
  created_at?: string,
  updated_at?: string,
}

export type UserType = {
  id?: number,
  username: string,
  status: string,
  messages: MessageType[],
  created_at?: string,
  updated_at?: string,
}

export type sendUserMessageDataType = {
  user: UserType,
  message: MessageType,
}
