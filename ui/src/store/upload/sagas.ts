import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  documentCreateRequest,
  documentCreateSuccess,
  documentCreateFailure,
  CreateDocument,
} from "./slices";
import http from "@/shared/api/http";
import { DocumentItem } from "@/shared/models";
import { addToast } from "../toast/slices";
import { addNewDocumentSuccess } from "../document/slices";

function* handleCreateDocument() {
  yield takeLatest(
    [documentCreateRequest],
    function* (action: PayloadAction<CreateDocument>) {
      if (!documentCreateRequest.match(action)) {
        return;
      }
      try {
        const { content, title, description } = action.payload;

        // Create FormData object
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("content", content); // File field
        yield delay(5000);
        // Make API call
        const response = yield call(http.post, "/documents", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.data.success) {
          // Handle success
          yield put(documentCreateSuccess(response.data.data.document));

          // Also, update document state to able chat with that new document
          yield put(addNewDocumentSuccess(response.data.data.document));
        }
      } catch (err: any) {
        // Extract error message
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred.";

        console.error("Upload Error:", err);

        // Handle failure
        yield put(documentCreateFailure(errorMessage));
        yield put(
          addToast({
            id: Date.now().toString(),
            title: "Error",
            description: errorMessage,
            type: "error",
          }),
        );
      }
    },
  );
}

export default function* uploadSagas() {
  yield all([handleCreateDocument()]);
}
