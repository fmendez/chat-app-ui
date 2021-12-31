import User from "./User";

function Users() {
  let list = ["Fernando", "Juan"];

  return (
    <div>
      {
        list.map(user => (<User key={user} user={user} />))
      }
    </div>
  )
}

export default Users;
