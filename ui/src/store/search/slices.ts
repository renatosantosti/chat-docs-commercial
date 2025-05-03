import { PageItem } from "@/shared/models";
import { SearchMode } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchResult {
  term: string;
  pages: PageItem[];
}

export interface SearchRequest {
  term: string;
  mode: SearchMode;
}

export interface SearchState {
  term: string;
  result: SearchResult;
  isFiltered: boolean;
  isLoading: boolean;
}

const initialState: SearchState = {
  term: "",
  result: null,
  isLoading: false,
  isFiltered: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchRequest: (
      state: SearchState,
      action: PayloadAction<SearchRequest>,
    ) => {
      state.term = action.payload.term;
      state.isLoading = true;
      state.isFiltered = false;
    },

    searchRequestSuccess: (
      state: SearchState,
      action: PayloadAction<SearchResult>,
    ) => {
      state.result = action.payload;
      state.isLoading = false;
      state.isFiltered = true;
    },

    searchRequestFailure: (state: SearchState) => {
      state.isLoading = false;
      state.isFiltered = false;
    },

    clearSearch: (state: SearchState) => {
      state.isLoading = false;
      state.isFiltered = false;
      state.result = null;
      state.term = "";
    },
  },
});

export const {
  searchRequest,
  searchRequestSuccess,
  searchRequestFailure,
  clearSearch,
} = searchSlice.actions;

const searchReducer = searchSlice.reducer;
export default searchReducer;
