import { PageItem } from "@/shared/models";
import { ChatMode } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChatResult {
  documentId: Number;
  documentName: string;
  term: string;
  pages: PageItem[];
  response?: string;
}

export interface ChatRequest {
  documentId: number;
  term: string;
  mode: ChatMode;
}

export interface ChatState {
  results: ChatResult[];
  wasActivated: boolean;
  isLoading: boolean;
}

const initialState: ChatState = {
  results: [],
  wasActivated: false,
  isLoading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chatRequest: (state: ChatState, action: PayloadAction<ChatRequest>) => {
      state.wasActivated = true;
      state.isLoading = true;
    },

    chatRequestSuccess: (
      state: ChatState,
      action: PayloadAction<ChatResult>,
    ) => {
      state.results = [
        ...state.results.filter(
          (r) => r.documentId !== action.payload.documentId,
        ),
        action.payload,
      ];
      state.isLoading = false;
    },

    chatRequestFailure: (state: ChatState) => {
      state.isLoading = false;
    },

    setActivated: (state: ChatState) => {
      state.wasActivated = true;
    },
  },
});

export const {
  chatRequest,
  chatRequestSuccess,
  chatRequestFailure,
  setActivated,
} = chatSlice.actions;

const chatReducer = chatSlice.reducer;
export default chatReducer;
