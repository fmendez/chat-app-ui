import { MessageType } from "../../types";

export const fetchMessages = async (): Promise<any> => {
  const res = await fetch("http://localhost:3090/messages")
  return await res.json()
}

export const sendMessage = async (message: MessageType): Promise<any> => {
  const res = await fetch("http://localhost:3090/messages", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  });

 return await res.json()
}
