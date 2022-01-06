import { useState } from "react"
import { useAppDispatch } from "../app/hooks";
import { addUserAsync } from "../features/users/usersSlice";
import { UserType } from "../types";

function JoinChat() {

  const [username, setUserName] = useState("");
  const [disableJoinBtn, setDisableJoinBtn] = useState(false);
  const dispatch = useAppDispatch();

  const handleJoin = () => {
    setDisableJoinBtn(true);
    let newUser: UserType = {
      username: username,
      status: 'online',
      messages: [],
    }
    dispatch(addUserAsync(newUser));
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div>
        <span className="font-semibold text-xl mr-1">Username:</span>
        <input className="rounded-lg p-1 mr-1"
          placeholder="enter user username" type="text"
          value={username} onChange={(e) => setUserName(e.target.value)} />
      </div>
      <div>
        <button
          className={
            `${[disableJoinBtn ? 'bg-button-disabled text-gray-300' :
              'bg-button font-semibold hover:bg-button-hover active:bg-button-active']
            }
             rounded-lg p-1
             `
          }
          onClick={() => handleJoin()} disabled={disableJoinBtn}>Join</button>
      </div>
    </div>
  )
}

export default JoinChat;
