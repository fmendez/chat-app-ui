import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { sendMessageAsync } from "../features/users/usersSlice";
import { MessageType, sendUserMessageDataType, UserType } from "../types";

function Entry() {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("")

  const buildDataToSend = () => {
    let currentUser: UserType = {
      id: 1,
      username: 'fmendez',
      status: 'online',
      messages: [],
    }

    let msg: MessageType = {
      content: `(${currentUser.username}) ${message}`
    }

    let data: sendUserMessageDataType = {
      message: msg,
      user: currentUser,
    }
    console.log("Data before sending: ", data);

    return data;
  };

  const handleSend = () => {
    dispatch(sendMessageAsync(buildDataToSend()))
    setMessage("")
  };

  return (
    <div>
      <input type="text" value={message} placeholder="Message" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => handleSend()} >SEND</button>
    </div>
  )
}

export default Entry;
