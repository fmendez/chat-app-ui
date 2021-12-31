import { MessageType } from "../types";

type Props = {
  message: MessageType
}

function Message({ message }: Props) {
  return (
    <div>
      {message.content}
    </div>
  )
}

export default Message;
