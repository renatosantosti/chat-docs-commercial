type SearchTermRequest = {
  mode: "document"  | "page"
  term: string;
  documentId?: number; // When mode is page the documentId is required, then all pages from that document is searched
};

export default SearchTermRequest;
