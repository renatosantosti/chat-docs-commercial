import { all, call, put, takeLatest } from "redux-saga/effects";
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

function* handleCreateDocument() {
    yield takeLatest([
      documentCreateRequest
      ], function* (action: PayloadAction<CreateDocument>) {
        if (!documentCreateRequest.match(action)) {
            return;
        }
        try {
            const res = yield call(http.post, "/documents", action.payload);
            yield put(documentCreateSuccess(res.data.user)); 
        } catch (err) {
            yield put(documentCreateFailure());
        }
  });
}

function* handleDocumentList() {
    yield takeLatest([
      documentListRequest,
      ], function* (action: PayloadAction) {
        if (!documentListRequest.match(action)) {
            return;
        }

        try {
          const list:Document[] = yield call(http.post, "/documents");
          //put...
        } catch (err) {
            console.error("Get all documents -  failed", err);
            yield put(documentListFailure());
        }
        yield put(documentListSuccess());
  });
}

function* handleDocumentSearch() {
  yield takeLatest([
    documentSearchRequest
  ], function* (action: PayloadAction<string>) {
    if (!documentSearchRequest.match(action)) {
        return;
    }
    try {
      const res = yield call(http.get, `/documents/search?term=${action.payload}`);
      yield put(documentSearchSuccess({ 
        term: action.payload,
        documents: res.data 
      })); 
    } catch (err) {
      yield put(documentSearchFailure());
    }
  });
}

function* handleDeletionDocument() {
  yield takeLatest([
    documentDeletionRequest
    ], function* (action: PayloadAction<number>) {
      if (!documentDeletionRequest.match(action)) {
          return;
      }
      try {
          const res = yield call(http.delete, `/documents/${action.payload}`);
          yield put(documentDeletionSuccess(res.data.user)); 
      } catch (err) {
          yield put(documentDeletionFailure());
      }
});
}


export default function* documentSagas() {
  yield all([
    handleCreateDocument(),
    handleDocumentList(),
    handleDocumentSearch(),
    handleDeletionDocument(),
  ]);
}
