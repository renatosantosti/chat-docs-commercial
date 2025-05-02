import { lookup } from "mime-types";

export const isValidPDF = async (buffer: Buffer): Promise<boolean> => {
  // Use Uint8Array to check the magic number for PDF files
  const magicNumber = new TextDecoder().decode(buffer.subarray(0, 4));
  if (magicNumber !== "%PDF") {
    return false;
  }

  // Fallback to mime-types for additional validation
  const mimeType = lookup(".pdf");
  return mimeType === "application/pdf";
};
