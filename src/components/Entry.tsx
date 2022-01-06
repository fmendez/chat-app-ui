import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { sendMessageAsync } from "../features/users/usersSlice";
import { MessageType, sendUserMessageDataType, UserType } from "../types";

function Entry() {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("")

  const buildDataToSend = () => {
    let currentUser: UserType = JSON.parse(localStorage.getItem("currentUser") || "{}")
    let msg: MessageType = {
      content: `(${currentUser.username}) ${message}`
    }

    let data: sendUserMessageDataType = {
      message: msg,
      user: currentUser,
    }
    return data;
  };

  const handleSend = () => {
    dispatch(sendMessageAsync(buildDataToSend()))
    setMessage("")
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> ) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-row justify-between mb-1">

      <input onKeyDown={(e) => handleKeyDown(e)}
             className="w-full" type="text"
             value={message} placeholder="Message"
             onChange={(e) => setMessage(e.target.value)} />

      <button className="bg-ill-secondary rounded-md p-1 ml-1 mr-1"
              onClick={() => handleSend()} >SEND</button>
    </div>
  )
}

export default Entry;
