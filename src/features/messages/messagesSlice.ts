import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RejectedActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { RootState } from "../../app/store";
import { MessageType } from "../../types";
import { fetchMessages, sendMessage } from "./messagesAPI";

export interface MessagesState {
  value: MessageType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MessagesState = {
  value: [],
  status: 'idle',
};

// export const sendMessageAsync = createAsyncThunk(
//   'messages/sendMessage',
//   async (message: string) => {
//     const response = await sendMessage(message);
//     return response;
//   }
// )

export const getMessagesAsync = createAsyncThunk(
  'messages/getMessages',
  async () => {
    const response = await fetchMessages();
    console.log("Response gotten from the slice async method: ", response)
    return response;
  }
)


export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageType>) => {
      state.value.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
  //     .addCase(sendMessageAsync.pending, (state) => {
  //       state.status = 'loading'
  //     }).addCase(sendMessageAsync.fulfilled, (state, action: PayloadAction<MessageType>) => {
  //       console.log("getMessagesAsync.fulfilled case")
  //       state.status = 'idle';
  //       state.value.push(action.payload)
  //     })
  //     .addCase(getMessagesAsync.pending, (state) => {
  //       console.log("getMessagesAsync.pending case")
  //       state.status = 'loading'
  //     }).addCase(getMessagesAsync.rejected, (_state, action: RejectedActionFromAsyncThunk<any>) => {
  //       console.log("getMessagesAsync.reject case")
  //       console.log("Error: ", action)
  //     })
      .addCase(getMessagesAsync.fulfilled, (state, action: PayloadAction<Array<MessageType>>) => {
        console.log("getMessagesAsync.fulfilled case")
        state.status = 'idle';
        console.log("messages to store: ", action.payload)
        state.value = action.payload
      });
  },
});

export const { addMessage} = messageSlice.actions;
export const selectMessages = (state: RootState) => state.messages.value
export default messageSlice.reducer;
