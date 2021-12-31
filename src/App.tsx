import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import Entry from "./components/Entry";
import Messages from "./components/Messages";
import Users from "./components/Users";
import { getMessagesAsync} from "./features/messages/messagesSlice";

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMessagesAsync())
  })


  return (
    <div className="grid grid-cols-2">
      <div className="bg-ill-main min-h-screen" >
        <Users/>
      </div>
      <div className="flex flex-col justify-between">
        <div className="">
          <Messages/>
        </div>
        <div className="bg-ill-secondary">
          <Entry/>
        </div>
      </div>
    </div>
  )
}

export default App;
