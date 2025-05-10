import pdfToText from "react-pdftotext";

function extractTextFromPdf(file: File) {
  return pdfToText(file)
    .then((text) => {
      return text;
    })
    .catch((error) =>
      console.error("Failed to extract text from pdf", { error }),
    );
}

export { extractTextFromPdf };
