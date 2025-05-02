import React, { useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  EyeIcon,
  Trash2,
  FileEdit as Edit2,
  Search,
  BotMessageSquare,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  documentListRequest,
  documentResetSearch,
  documentSearchRequest,
  DocumentState,
} from "@/store/document/slices";
import { useToast } from "@/hooks/use-toast";
import { DocumentItem } from "@/shared/models";
import { useNavigate } from "react-router-dom";
import { searchRequest } from "@/store/search/slices";

interface DocumentSearchProps {}

const DocumentSearch: React.FC<DocumentSearchProps> = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { toast } = useToast();
  //   const { documents, filtered, isFiltered } = useSelector((state: DocumentState) => state.documents);

  const documents: DocumentItem[] = Array.from({ length: 30 }, (_, i) => ({
    id: 15,
    title: `Document ${i + 1}`,
    description: "xyz...",
    date: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
    ).toISOString(),
    pages: Math.floor(Math.random() * 50) + 1,
    type: "pdf",
  }));

  const notImplemented = () => {
    alert(
      "It was not integrated on UI yet, please see it working REST API on Swagger.",
    );
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Please enter a search term",
        description: "You need to enter a term to search for documents",
        variant: "destructive",
      });
      return;
    }
    dispatch(
      searchRequest({ documentId: null, term: searchTerm, mode: "documents" }),
    );
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    dispatch(documentResetSearch());
  };

  const displayedDocuments = documents; //isFiltered ? filtered?.documents : documents;
  const isFiltered = false;
  const filtered = { term: "agile", documents: [] };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Type term to search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 text-lg"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
          <Button onClick={handleSearch} className="min-w-40">
            <Search className="mr-2 h-4 w-4" />
            Search All Documents
          </Button>
        </div>

        {isFiltered && (
          <div className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
            <p>
              You have {filtered?.documents.length || 0} document(s)
              {filtered?.term ? ` matching "${filtered?.term}"` : ""}
            </p>
            <Button
              variant="outline"
              onClick={handleClearSearch}
              className="text-red-500"
            >
              Clear search
            </Button>
          </div>
        )}
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Upload at</TableHead>
              <TableHead>Document</TableHead>
              <TableHead>Page</TableHead>
              <TableHead>Text</TableHead>
              <TableHead className="w-[120px]">Chat</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedDocuments && displayedDocuments.length > 0 ? (
              displayedDocuments.map((doc: any) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    {new Date(doc.date || Date.now()).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{doc.title}</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>
                    <Highlighter
                      highlightClassName="YourHighlightClass"
                      searchWords={[...searchTerm.split(" ")]}
                      autoEscape={true}
                      textToHighlight="The dog is chasing the cat. Or perhaps they're just playing?"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => navigate("/chatdoc/56")}
                    >
                      <BotMessageSquare className="mr-2 h-4 w-4" />
                      Chat this doc!
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => notImplemented()}
                      >
                        <span className="sr-only">Delete</span>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => notImplemented()}
                      >
                        <span className="sr-only">Preview</span>
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => notImplemented()}
                      >
                        <span className="sr-only">Edit</span>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No documents found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DocumentSearch;
