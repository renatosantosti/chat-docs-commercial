import { Toast } from "@/shared/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToastState {
  toasts: Toast[];
}

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload,
      );
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
const toastReducer = toastSlice.reducer;
export default toastReducer;
