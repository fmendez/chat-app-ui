import { UserType } from "../types";

type Props = {
  user: UserType
}

function User({ user }: Props) {
  const isCurrentUser = (user: UserType) => {
    const currentUser: UserType = JSON.parse(localStorage.getItem("currentUser") || "{}");
    return currentUser.username === user.username;
  };

  return (
    <div className={
      `${[isCurrentUser(user) ? 'bg-ill-secondary' : 'bg-ill-main']}`
    }>
      {user.username}
    </div>
  )
}

export default User;
