import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  searchRequest,
  searchRequestSuccess,
  searchRequestFailure,
  SearchResult,
} from "./slices";
import http from "@/shared/api/http";

function* handleSearchRequest() {
  yield takeLatest(searchRequest, function* (action) {
    if (!searchRequest.match(action)) {
      return;
    }
    try {
      const res = yield call(http.post, "/search", {
        mode: action.payload.mode,
        term: action.payload.term,
      });

      if (res.status != 200 || !res.data.data.success) {
        yield put(searchRequestFailure());
        return;
      }

      const data = res.data.data;
      const result: SearchResult = {
        term: action.payload.term,
        pages: data.result.map((page: any) => ({
          pageId: page.pageNumber,
          documentId: page.documentId,
          documentName: page.documentName,
          pageNumber: page.pageNumber,
          content: page.content,
        })),
      };
      yield put(searchRequestSuccess(result));
    } catch (err) {
      yield put(searchRequestFailure());
    }
  });
}

export default function* searchSagas() {
  yield all([handleSearchRequest()]);
}
