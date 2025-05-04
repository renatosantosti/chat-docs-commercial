import { UserItem } from "@/shared/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  repeatedPassword: string;
  image: string;
}

export interface UserState {
  user: UserItem;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  hasError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userCreateRequest: (state, action: PayloadAction<CreateUser>) => {
      state.isLoading = true;
      state.hasError = false;
      state.user = null;
    },

    userCreateSuccess: (state: UserState, action: PayloadAction<UserItem>) => {
      state.isLoading = false;
      state.hasError = false;
      state.user = action.payload;
    },

    userCreateFailure: (state: UserState) => {
      state.isLoading = false;
      state.hasError = true;
      state.user = null;
    },

    resetUserInfo: (state: UserState) => {
      state.isLoading = false;
      state.hasError = false;
      state.user = null;
    },
  },
});

export const {
  userCreateRequest,
  userCreateSuccess,
  userCreateFailure,
  resetUserInfo,
} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
