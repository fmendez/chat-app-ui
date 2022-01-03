import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { sendUserMessageDataType, UserType } from "../../types";
import { addNewUser, fetchAllUsers, removeUser, sendUserMessage } from "./usersAPI";


export interface UsersState {
  value: UserType[];
  status: 'idle' | 'loading' | 'failed'
}

const initialState: UsersState = {
  value: [],
  status: 'idle'
}

export const allUserAsync = createAsyncThunk(
  'users/AllUsers',
  async () => {
    const response = await fetchAllUsers();
    return response
  }
)

export const addUserAsync = createAsyncThunk(
  'users/addUser',
  async (user: UserType) => {
    const response = await addNewUser(user);
    return response;
  }
)

export const removeUserAsync = createAsyncThunk(
  'users/removeUser',
  async (user: UserType) => {
    const response = await removeUser(user);
    return response;
  }
)

export const sendMessageAsync = createAsyncThunk(
  'users/sendMessage',
  async (data: sendUserMessageDataType) => {
    const response = await sendUserMessage(data);
    return response;
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // addMessage: (state, action: PayloadAction<essageType>) => {
    //   state.value.push(action.payload)
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageAsync.fulfilled, (state, action: PayloadAction<sendUserMessageDataType>) => {
        let updatedUser: UserType = state.value.filter(user => user.id === action.payload.user.id)[0];
        updatedUser.messages.push(action.payload.message);
        state.value = state.value.map(user => user.id !== updatedUser.id ? user : updatedUser)
      })
  },
});

// export const { addMessage} = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users.value
export default usersSlice.reducer;
