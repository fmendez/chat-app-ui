type UserType = {
  user: string
}

function User({ user }: UserType) {
  return (
    <div>{user}</div>
  )
}

export default User;
