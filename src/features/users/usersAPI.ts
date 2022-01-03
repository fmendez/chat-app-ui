import { sendUserMessageDataType, UserType } from "../../types";

export const fetchAllUsers = async (): Promise<any> => {
  const res = await fetch("http://localhost:3090/users")
  return await res.json()
};

export const addNewUser = async (user: UserType): Promise<any> => {
  const res = await fetch("http://localhost:3090/users", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  return await res.json()
};

export const removeUser = async (user: UserType): Promise<any> => {
  const res = await fetch(`http://localhost:3090/users/${user.id}`, {
    method: 'DELETE'
  });

  return await res.json()
};

export const fetchUserMessages = async (user: UserType): Promise<any> => {
  const res = await fetch(`http://localhost:3090/users/${user.id}/messages`)
  return await res.json()
}

export const sendUserMessage = async (data: sendUserMessageDataType): Promise<any> => {
  const res = await fetch(`http://localhost:3090/users/${data.user.id}/add_message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user_id: data.user.id, message: data.message.content })
  });

  return await res.json()
}
