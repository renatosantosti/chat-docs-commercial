
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DocumentsFilter from "@/components/DocumentsFilter";
import DocumentGrid from "@/components/DocumentGrid";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { DocumentItem } from "@/shared/models";

// Mock data for documents
// In a real app, this would come from an API call
const mockDocuments:DocumentItem[] = Array.from({ length: 30 }, (_, i) => ({
  id: 15,
  title: `Document ${i + 1}`,
  date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  pages: Math.floor(Math.random() * 50) + 1,
  type: "pdf"
}));

const Documents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [documentType, setDocumentType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter documents based on search term and document type
  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearchTerm = !searchTerm || doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = documentType === "all" || doc.type === documentType;
    return matchesSearchTerm && matchesType;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);

  const resetFilters = () => {
    setSearchTerm("");
    setDocumentType("all");
    setCurrentPage(1);
  };

  const handleUpload = () => {
    navigate("/upload-document");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold gradient-text">Your Documents</h1>
        <Button onClick={handleUpload} className="button-gradient">
          <PlusIcon className="mr-2 h-4 w-4" /> Upload Document
        </Button>
      </div>

      <DocumentsFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        resetFilters={resetFilters}
      />

      <DocumentGrid 
        documents={paginatedDocuments} 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Documents;
