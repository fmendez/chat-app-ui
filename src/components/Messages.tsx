import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addMessage, selectMessages } from "../features/messages/messagesSlice";
import { MessageType } from "../types";
import Message from "./Message";
import ActionCable from 'actioncable';
import { useEffect } from "react";

function Messages() {
  const messages: MessageType[] = useAppSelector(selectMessages);
  const cable = ActionCable.createConsumer("ws://localhost:3090/cable");
  const dispatch = useAppDispatch();

  const createSubscription = () => {
    cable.subscriptions.create(
      { channel: 'MessagesChannel' },
      { received: message => handleReceivedMessage(message) })
  };

  const handleReceivedMessage = (message: any) => {
    dispatch(addMessage(message))
  };

  useEffect(() => {
    createSubscription();
  }, [])

  return (
    <div className="">
      {
        messages.map(message =>
          (<Message key={message.id} message={message} />))
      }
    </div>
  )

}

export default Messages;
