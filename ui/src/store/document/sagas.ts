import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
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
  CreateDocument,
} from "./slices";
import http from "@/shared/api/http";
import { DocumentItem } from "@/shared/models";
import { addToast } from "../toast/slices";

function* handleCreateDocument() {
  yield takeLatest(
    [documentCreateRequest],
    function* (action: PayloadAction<CreateDocument>) {
      if (!documentCreateRequest.match(action)) {
        return;
      }
      try {
        const res = yield call(http.post, "/documents", action.payload);
        yield put(documentCreateSuccess(res.data.document));
      } catch (err) {
        // Extract detailed error message from HTTP response
        const errorMessage =
          err.response?.data?.data?.message ||
          err.message ||
          "An unexpected error occurred.";

        console.error("HTTP Error:", err);
        yield put(
          addToast({
            id: Date.now().toString(),
            title: "Error",
            description: errorMessage,
            type: "error",
          }),
        );
        yield put(documentCreateFailure());
      }
    },
  );
}

function* handleDocumentList() {
  yield takeLatest([documentListRequest], function* (action: PayloadAction) {
    if (!documentListRequest.match(action)) {
      return;
    }

    try {
      const res = yield call(http.get, "/documents");
      if (res.statusCode !== 200 && res.data.success) {
        yield put(documentListFailure());
        return;
      }

      const docs: DocumentItem[] = res.data.data.documents.map((doc: any) => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        date: doc.createdOn,
        pages: doc.numPages,
        type: "PDF",
      }));

      // force loading at least 1,5 seconds
      yield delay(700);
      yield put(documentListSuccess(docs));
    } catch (err) {
      // Extract detailed error message from HTTP response
      const errorMessage =
        err.response?.data?.data?.message ||
        err.message ||
        "An unexpected error occurred.";

      console.error("HTTP Error:", err);
      yield put(
        addToast({
          id: Date.now().toString(),
          title: "Error",
          description: errorMessage,
          type: "error",
        }),
      );
      yield put(documentListFailure());
    }
  });
}

function* handleDocumentSearch() {
  yield takeLatest(
    [documentSearchRequest],
    function* (action: PayloadAction<string>) {
      if (!documentSearchRequest.match(action)) {
        return;
      }
      try {
        const res = yield call(
          http.get,
          `/documents/search?term=${action.payload}`,
        );
        yield put(
          documentSearchSuccess({
            term: action.payload,
            documents: res.data,
          }),
        );
      } catch (err) {
        // Extract detailed error message from HTTP response
        const errorMessage =
          err.response?.data?.data?.message ||
          err.message ||
          "An unexpected error occurred.";

        console.error("HTTP Error:", err);
        yield put(
          addToast({
            id: Date.now().toString(),
            title: "Error",
            description: errorMessage,
            type: "error",
          }),
        );
        yield put(documentSearchFailure());
      }
    },
  );
}

function* handleDeletionDocument() {
  yield takeLatest(
    [documentDeletionRequest],
    function* (action: PayloadAction<number>) {
      if (!documentDeletionRequest.match(action)) {
        return;
      }
      try {
        const res = yield call(http.delete, `/documents/${action.payload}`);
        yield put(documentDeletionSuccess(res.data.user));
      } catch (err) {
        yield put(documentDeletionFailure());
      }
    },
  );
}

export default function* documentSagas() {
  yield all([
    handleCreateDocument(),
    handleDocumentList(),
    handleDocumentSearch(),
    handleDeletionDocument(),
  ]);
}
