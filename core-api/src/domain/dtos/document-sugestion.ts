/**
 * Represents a suggestion for a document.
 * This DTO is used to encapsulate the title and description of a document suggestion.
 * It is typically used in the context of providing suggestions for documents to be created or referenced.
 */
type DocumentSuggestionDto = {
  title: string;
  description: string;
};

export default DocumentSuggestionDto;
