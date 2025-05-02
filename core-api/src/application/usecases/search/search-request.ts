type SearchTermRequest = {
  mode: "documents" | "pages";
  term: string;
  documentId?: number; // When mode is "Page" the documentId is required, then all pages from that document is searched
};

export default SearchTermRequest;
