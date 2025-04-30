import { DocumentItem } from "@/shared/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CreateDocument {
  title: string;
  description: string;
  content: string;
}

export interface SearchResult {
  term: string;
  documents: DocumentItem[];
}

export interface DocumentState {
  documents:DocumentItem[];
  filtered:SearchResult | null;
  isFiltered: boolean;
}

const initialState: DocumentState = {
  documents: [],
  filtered: null,
  isFiltered: false,
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {

    documentCreateRequest: (_, action: PayloadAction<CreateDocument>) => {
    },

    documentCreateSuccess: (state, action: PayloadAction<DocumentItem>) => {
      state.isFiltered = false;
      state.documents  =  [...state.documents, action.payload];
    },

    documentCreateFailure: () => {
    },

    documentListRequest: () => {
    },

    documentListSuccess: (state:DocumentState, action: PayloadAction<DocumentItem[]>) => {
      state.isFiltered = false;
      state.documents  =  action.payload;
    },

    documentListFailure: (state:DocumentState) => {
      state.documents  = [];
    },

    documentSearchRequest: (_, action: PayloadAction<string>) => {
    },

    documentSearchSuccess: (state:DocumentState, action: PayloadAction<SearchResult>) => {
      state.isFiltered = true;
      state.filtered = action.payload;
    },

    documentSearchFailure: (state:DocumentState) => {
      state.filtered  = null;
    },

    documentResetSearch: (state:DocumentState) => {
      state.filtered  = null;
      state.isFiltered = false;
    },

    documentDeletionRequest: (_, action: PayloadAction<number>) => {
    },

    documentDeletionSuccess: (state:DocumentState, action: PayloadAction<number>)=> {
      state.documents = state.documents.filter(d => d.id !== action.payload);
      if(state.isFiltered){
        state.filtered.documents = state.filtered.documents.filter(d => d.id !== action.payload);
      }
    },

    documentDeletionFailure: () => {
    },
  },
});

export const {
  documentCreateRequest,
  documentCreateSuccess,
  documentCreateFailure,
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

export default documentSlice.reducer;