import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { MessageType } from "../../types";
import { fetchMessages} from "./messagesAPI";

export interface MessagesState {
  value: MessageType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MessagesState = {
  value: [],
  status: 'idle',
};

export const getMessagesAsync = createAsyncThunk(
  'messages/getMessages',
  async () => {
    const response = await fetchMessages();
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
      .addCase(getMessagesAsync.fulfilled, (state, action: PayloadAction<Array<MessageType>>) => {
        state.status = 'idle';
        state.value = action.payload
      });
  },
});

export const { addMessage} = messageSlice.actions;
export const selectMessages = (state: RootState) => state.messages.value
export default messageSlice.reducer;
