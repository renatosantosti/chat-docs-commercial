import { PageItem } from "@/shared/models";
import { SearchMode } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchResult {
  documentId: Number;
  term: string;
  pages: PageItem[];
  response?: string;
}

export interface SearchRequest {
  documentId: number;
  term: string;
  mode: SearchMode;
}

export interface SearchState {
  term: string;
  results: SearchResult[];
  wasActivated: boolean;
  isLoading: boolean;
}

const initialState: SearchState = {
  term: "",
  results: [],
  wasActivated: false,
  isLoading: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchRequest: (
      state: SearchState,
      action: PayloadAction<SearchRequest>,
    ) => {
      state.wasActivated = true;
      state.isLoading = true;
    },

    searchRequestSuccess: (
      state: SearchState,
      action: PayloadAction<SearchResult>,
    ) => {
      state.results = [
        ...state.results.filter(
          (r) => r.documentId !== action.payload.documentId,
        ),
        action.payload,
      ];

      state.isLoading = false;
    },

    searchRequestFailure: (state: SearchState) => {
      state.isLoading = false;
    },

    setActivated: (state: SearchState) => {
      state.wasActivated = true;
    },
  },
});

export const {
  searchRequest,
  searchRequestSuccess,
  searchRequestFailure,
  setActivated,
} = searchSlice.actions;

const searchReducer = searchSlice.reducer;
export default searchReducer;
