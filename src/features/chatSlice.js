import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const CONVERSATION_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/message`;

const initialState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  notifications: [],
  messages: [],
  files: [],
};

export const getConversations = createAsyncThunk(
  "get/all/conversation",
  async (accesstoken, { rejectWithValue }) => {
    try {
      const response = await axios.get(CONVERSATION_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createOpenConversation = createAsyncThunk(
  "create/open/conversation",
  async (values, { rejectWithValue }) => {
    const { accesstoken, recieverId, isGroup } = values;
    try {
      const response = await axios.post(
        CONVERSATION_ENDPOINT,
        {
          recieverId,
          isGroup,
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getConversationMessages = createAsyncThunk(
  "get/all/messages",
  async (values, { rejectWithValue }) => {
    const { accessToken, conversation_id } = values;
    try {
      const response = await axios.get(
        `${MESSAGE_ENDPOINT}/${conversation_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatSlice = createSlice({
  name: "chatState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConversations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        // console.log("API Response for conversations:", action.payload);
        state.status = "succeeded";
        state.conversations = action.payload.allConversations;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(createOpenConversation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOpenConversation.fulfilled, (state, action) => {
        // console.log("API Response for conversations:", action.payload);
        state.status = "succeeded";
        state.activeConversation = action.payload.conversation;
      })
      .addCase(createOpenConversation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(getConversationMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConversationMessages.fulfilled, (state, action) => {
        // console.log("API Response for conversations:", action.payload);
        state.status = "succeeded";
        state.messages = action.payload.messages;
      })
      .addCase(getConversationMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const { updateCliked } = chatSlice.actions;
export default chatSlice.reducer;
//
