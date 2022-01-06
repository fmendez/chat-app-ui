import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Entry from "./components/Entry";
import JoinChat from "./components/JoinChat";
import Messages from "./components/Messages";
import Users from "./components/Users";
import { getMessagesAsync } from "./features/messages/messagesSlice";
import { allUserAsync, selectUserLoggedIn, setUserAsLoggedIn } from "./features/users/usersSlice";
import { UserType } from "./types";

function App() {

  const dispatch = useAppDispatch();
  const currentUserLoggedIn = useAppSelector(selectUserLoggedIn)
  const userPreviouslyCreated = () => {
    let currentUser: UserType = JSON.parse(localStorage.getItem("currentUser") || "{}")
    if (currentUser.username) {
      dispatch(setUserAsLoggedIn(true))
    }
  };

  useEffect(() => {
    dispatch(getMessagesAsync())
    dispatch(allUserAsync())
    userPreviouslyCreated()
  })

  return (
    <div>
      {!currentUserLoggedIn &&
        <div>
          <JoinChat />
        </div>
      }
      {currentUserLoggedIn &&
        <div className="grid grid-cols-8 gap-1 rounded-md">
          <div className="col-span-1 bg-ill-main min-h-screen" >
            <Users />
          </div>
          <div className="col-span-7 flex flex-col justify-between">
            <div className="">
              <Messages />
            </div>
            <div>
            <Entry />
            </div>
          </div>
        </div>
      }
    </div >
  )
}

export default App;
