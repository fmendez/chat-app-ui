export const fetchMessages = async (): Promise<any> => {
  const res = await fetch("http://localhost:3090/messages")
  return await res.json()
}
