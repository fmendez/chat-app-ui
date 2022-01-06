import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { sendUserMessageDataType, UserType } from "../../types";
import { addNewUser, fetchAllUsers, removeUser, sendUserMessage } from "./usersAPI";


export interface UsersState {
  value: UserType[];
  status: 'idle' | 'loading' | 'failed'
  userLoggedIn: boolean
}

const initialState: UsersState = {
  value: [],
  status: 'idle',
  userLoggedIn: false
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
    setUserAsLoggedIn: (state, action) => {
      state.userLoggedIn = action.payload;
    },
    addUser: (state, action) => {
      state.value.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageAsync.fulfilled, (state, action) => {
        let updatedUser: UserType = state.value.filter(user => user.id === action.payload.user.id)[0];
        updatedUser.messages.push(action.payload.message);
        state.value = state.value.map(user => user.id !== updatedUser.id ? user : updatedUser)
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.value.push(action.payload);
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
        state.userLoggedIn = true;
      })
      .addCase(allUserAsync.fulfilled, (state, action) => {
        state.value = action.payload;
      })
  },
});

export const { setUserAsLoggedIn, addUser } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users.value;
export const selectUserLoggedIn = (state: RootState) => state.users.userLoggedIn;
export default usersSlice.reducer;
