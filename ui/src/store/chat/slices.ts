import { PageItem } from "@/shared/models";
import { ChatMode } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChatResult {
  documentId: Number;
  term: string;
  pages: PageItem[];
  response?: string[];
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
  response?: string;
}

const initialState: ChatState = {
  results: [],
  wasActivated: false,
  isLoading: false,
  response: `Hi guys, I will leverage this moment to speak a little bit about me...well as you know I am Renato Santos. 
    During my career, I worked in different industries and with different approaches to solving problems. So, I am flexible, innovative, and fast-paced to learn new things. 
    I feel free to explore new things and jump to another new technology whenever it is needed or I will explore it.
    I THINK SOLUTION IS MORE THAN TECHNOLOGIES - SO TECH IS TOOLS TO BE USED AND COMBINED TO ACHIEVE A SMART SOLUTION.
    Be an expert is good, I am an expert whenever I have been working for a long time with certain stuff, but I am always ready to explore new things, that´s my spirit. Sorry to stop your flow! 
    Go ahead, ask something to the doc!`,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chatRequest: (state: ChatState, action: PayloadAction<ChatRequest>) => {
      state.wasActivated = true;
      state.isLoading = true;
      if (action.payload.mode === "chat") state.response = "thinking...";
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
      if (action.payload.response && action.payload.response.length > 0)
        state.response = action.payload.response[0];
    },

    chatRequestFailure: (state: ChatState) => {
      state.isLoading = false;
    },

    askQuestion: (state: ChatState) => {
      state.response = "Waiting for questions.";
    },

    clearResult: (state: ChatState) => {
      state.wasActivated = true;
      state.isLoading = false;
      state.results = [];
    },
  },
});

export const {
  chatRequest,
  chatRequestSuccess,
  chatRequestFailure,
  askQuestion,
  clearResult,
} = chatSlice.actions;

const chatReducer = chatSlice.reducer;
export default chatReducer;
