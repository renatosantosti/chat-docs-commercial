import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./auth/slices";
import documentReducer from "./document/slices";
import rootSagas from "./RootSaga";
import chatReducer from "./chat/slices";
import searchReducer from "./search/slices";
import toastReducer from "./toast/slices";
import uploadReducer from "./upload/slices";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store with the saga middleware
const store = configureStore({
  reducer: {
    auth: authReducer,
    document: documentReducer,
    chat: chatReducer,
    search: searchReducer,
    toast: toastReducer,
    upload: uploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // Disable thunk and add saga middleware
  devTools: process.env.NODE_ENV !== "production",
});

// Run the root saga
sagaMiddleware.run(rootSagas);

export default store;
