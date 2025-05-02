import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (
      state,
      _action: PayloadAction<{ email: string; password: string }>,
    ) => {
      state.error = null;
    },

    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    clearError: (state, action: PayloadAction<string>) => {
      state.error = null;
    },

    logoutRequest: () => {},

    logoutSuccess: () => initialState,

    checkAuthRequest: () => {},

    checkAuthSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    checkAuthFailure: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  checkAuthRequest,
  checkAuthSuccess,
  checkAuthFailure,
  clearError,
} = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
