import { DocumentItem } from "@/shared/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchResult {
  term: string;
  documents: DocumentItem[];
}

export interface DocumentState {
  documents: DocumentItem[];
  filtered: SearchResult | null;
  isFiltered: boolean;
  isLoading: boolean;
}

const initialState: DocumentState = {
  documents: [],
  filtered: null,
  isFiltered: false,
  isLoading: false,
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    addNewDocumentSuccess: (
      state: DocumentState,
      action: PayloadAction<DocumentItem>,
    ) => {
      state.documents = [...state.documents, action.payload];
    },

    documentListRequest: (state: DocumentState) => {
      state.isLoading = true;
    },

    documentListSuccess: (
      state: DocumentState,
      action: PayloadAction<DocumentItem[]>,
    ) => {
      state.isFiltered = false;
      state.isLoading = false;
      state.documents = action.payload;
    },

    documentListFailure: (state: DocumentState) => {
      state.documents = [];
    },

    documentSearchRequest: (
      state: DocumentState,
      action: PayloadAction<string>,
    ) => {
      state.isLoading = true;
    },

    documentSearchSuccess: (
      state: DocumentState,
      action: PayloadAction<SearchResult>,
    ) => {
      state.isFiltered = true;
      state.filtered = action.payload;
      state.isLoading = false;
    },

    documentSearchFailure: (state: DocumentState) => {
      state.filtered = null;
      state.isLoading = false;
    },

    documentResetSearch: (state: DocumentState) => {
      state.filtered = null;
      state.isFiltered = false;
    },

    documentDeletionRequest: (
      state: DocumentState,
      action: PayloadAction<number>,
    ) => {
      state.isLoading = true;
    },

    documentDeletionSuccess: (
      state: DocumentState,
      action: PayloadAction<number>,
    ) => {
      state.documents = state.documents.filter((d) => d.id !== action.payload);
      if (state.isFiltered) {
        state.filtered.documents = state.filtered.documents.filter(
          (d) => d.id !== action.payload,
        );
      }
      state.isLoading = false;
    },

    documentDeletionFailure: (state: DocumentState) => {
      state.isLoading = false;
    },
  },
});

export const {
  addNewDocumentSuccess,
  documentListRequest,
  documentListSuccess,
  documentListFailure,
  documentSearchRequest,
  documentSearchSuccess,
  documentSearchFailure,
  documentDeletionRequest,
  documentDeletionSuccess,
  documentDeletionFailure,
  documentResetSearch,
} = documentSlice.actions;

const documentReducer = documentSlice.reducer;
export default documentReducer;
