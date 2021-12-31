import { useAppSelector } from "../app/hooks";
import { selectMessages } from "../features/messages/messagesSlice";
import { MessageType } from "../types";
import Message from "./Message";

function Messages() {
  const messages: MessageType[] = useAppSelector(selectMessages);
  return (
    <div>
      {
        messages.map(message => (<Message key={message.id} message={message} />))
      }
    </div>
  )

}

export default Messages;
