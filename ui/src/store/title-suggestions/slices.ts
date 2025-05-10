import { SuggestionItem } from "@/shared/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DocumentSuggestionsRequest {
  fileName: string;
  contentSample: string;
}

export interface DocumentSuggestionsState {
  suggestions: SuggestionItem[];
  isGenerated: boolean;
  isLoading: boolean;
}

const initialState: DocumentSuggestionsState = {
  suggestions: [],
  isLoading: false,
  isGenerated: false,
};

const getSuggestionsSlice = createSlice({
  name: "documentSuggestions",
  initialState,
  reducers: {
    getSuggestionsRequest: (
      state: DocumentSuggestionsState,
      action: PayloadAction<DocumentSuggestionsRequest>,
    ) => {
      state.isLoading = true;
      state.isGenerated = false;
    },

    getSuggestionsRequestSuccess: (
      state: DocumentSuggestionsState,
      action: PayloadAction<SuggestionItem[]>,
    ) => {
      state.suggestions = action.payload;
      state.isLoading = false;
      state.isGenerated = true;
    },

    getSuggestionsRequestFailure: (state: DocumentSuggestionsState) => {
      state.isLoading = false;
      state.isGenerated = false;
    },

    clearDocumentSuggestions: (state: DocumentSuggestionsState) => {
      state.isLoading = false;
      state.isGenerated = false;
      state.suggestions = [];
    },
  },
});

export const {
  getSuggestionsRequest,
  getSuggestionsRequestSuccess,
  getSuggestionsRequestFailure,
  clearDocumentSuggestions,
} = getSuggestionsSlice.actions;

const getSuggestionsReducer = getSuggestionsSlice.reducer;
export default getSuggestionsReducer;
