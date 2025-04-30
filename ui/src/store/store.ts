import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./auth/slices";
import documentReducer from "./document/slices";
import rootSagas from "./RootSaga";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store with the saga middleware
const store = configureStore({
  reducer: {
    auth: authReducer,
    document: documentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // Disable thunk and add saga middleware
    devTools: process.env.NODE_ENV !== 'production',
});

// Run the root saga
sagaMiddleware.run(rootSagas);

export default store;