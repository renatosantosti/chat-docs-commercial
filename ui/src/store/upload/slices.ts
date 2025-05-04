import { DocumentItem } from "@/shared/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CreateDocument {
  title: string;
  description: string;
  content: File;
}

export interface UploadState {
  document: DocumentItem;
  isUploading: boolean;
  hasError: boolean;
}

const initialState: UploadState = {
  document: null,
  isUploading: false,
  hasError: false,
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    documentCreateRequest: (state, action: PayloadAction<CreateDocument>) => {
      state.isUploading = true;
      state.hasError = false;
      state.document = null;
    },

    documentCreateSuccess: (
      state: UploadState,
      action: PayloadAction<DocumentItem>,
    ) => {
      state.isUploading = false;
      state.hasError = false;
      state.document = action.payload;
    },

    documentCreateFailure: (state: UploadState) => {
      state.isUploading = false;
      state.hasError = true;
      state.document = null;
    },

    resetUploadInfo: (state: UploadState) => {
      state.isUploading = false;
      state.hasError = false;
      state.document = null;
    },
  },
});

export const {
  documentCreateRequest,
  documentCreateSuccess,
  documentCreateFailure,
  resetUploadInfo,
} = uploadSlice.actions;

const uploadReducer = uploadSlice.reducer;
export default uploadReducer;
