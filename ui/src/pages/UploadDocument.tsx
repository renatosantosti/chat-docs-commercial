import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  CheckCircle,
  Upload,
  MessageSquareText,
  ChevronRight,
  ArrowRight,
  Wand2,
} from "lucide-react";
import { toast as notification } from "sonner";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  documentCreateRequest,
  resetUploadInfo,
  UploadState,
} from "@/store/upload/slices";

import { extractTextFromPdf } from "@/shared/api/utils";
import {
  clearDocumentSuggestions,
  DocumentSuggestionsState,
  getSuggestionsRequest,
} from "@/store/title-suggestions/slices";
import Loading from "@/components/Loading";

const UploadDocument = () => {
  const state = useSelector((store: { upload: UploadState }) => store.upload);

  const suggestionsState = useSelector(
    (store: { suggestions: DocumentSuggestionsState }) => store.suggestions,
  );
  const { isGenerated, suggestions } = suggestionsState;
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { document: documentItem, isUploading } = state;
  const [currentTab, setCurrentTab] = useState("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [docTextContent, setDocTextContent] = useState<string>(null);
  const [isProcessing, setIsUploading] = useState(false);
  const [isWaitingForSuggestion, setIsWaitingForSuggestion] = useState<
    "title" | "summary" | null
  >(null);

  // Form for document details
  const form = useForm({
    defaultValues: {
      title: "",
      summary: "",
    },
  });

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.type !== "application/pdf") {
        notification.error("Please upload a PDF file");
        return;
      }

      const docTextPlain = await extractTextFromPdf(file);
      if (!docTextPlain) {
        notification.error("Failed to extract text from PDF");
        return;
      }
      // clear previous suggestions when a new file is uploaded
      dispatch(clearDocumentSuggestions());
      const contentSample = docTextPlain.substring(0, 999); // Limit to 1000 characters
      setDocTextContent(contentSample); // Limit to 1000 characters

      setIsUploading(true);
      setTimeout(() => {
        dispatch(resetUploadInfo());
        setUploadedFile(file);
        setIsUploading(false);
      }, 1000);
    }
  };

  // Handle drag and drop
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      if (file.type !== "application/pdf") {
        notification.error("Please upload a PDF file");
        return;
      }

      const docTextPlain = await extractTextFromPdf(file);
      if (!docTextPlain) {
        notification.error("Failed to extract text from PDF");
        return;
      }

      // clear previous suggestions when a new file is uploaded
      dispatch(clearDocumentSuggestions());
      setDocTextContent(docTextPlain.substring(0, 100)); // Limit to 1000 characters

      setIsUploading(true);
      setTimeout(() => {
        dispatch(resetUploadInfo());
        setUploadedFile(file);
        setIsUploading(false);
        notification.success("File upload loaded, not saved yet!");
      }, 1000);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle document details submission
  const onSubmitDetails = (values: { title: string; summary: string }) => {
    if (form.getValues("title") === "" || form.getValues("summary") === "") {
      toast({
        title: "Please enter all required fields.",
        description: "Both title and summary are required!",
        variant: "destructive",
      });
      return;
    } else {
      // Dispatch the upload action
      dispatch(
        documentCreateRequest({
          content: uploadedFile,
          title: form.getValues("title"),
          description: form.getValues("summary"),
        }),
      );
    }
  };

  // Generate content with AI
  const generateWithAI = (field: "title" | "summary") => {
    notification.info("Generating content with AI...", {
      duration: 700,
    });

    if (isGenerated) {
      setTimeout(() => {
        if (field === "title") {
          // here we will a ramdom title from the suggestions
          const randomIndex = Math.floor(Math.random() * suggestions.length);
          const generatedTitle = suggestions[randomIndex].title;
          form.setValue("title", generatedTitle);
        } else {
          // here we will a ramdom description from the suggestions
          const randomIndex = Math.floor(Math.random() * suggestions.length);
          const generatedDescription = suggestions[randomIndex].description;
          form.setValue("summary", generatedDescription);
        }
        notification.success(`Generated ${field} with AI`);
      }, 1000);
    } else {
      notification.info("Processing new suggestions, wait...", {
        duration: 700,
      });

      dispatch(
        getSuggestionsRequest({
          fileName: uploadedFile?.name,
          contentSample: docTextContent,
        }),
      );

      // after dispatching the action, we will wait for the response.
      setIsWaitingForSuggestion(field); // Mark that we are waiting
    }
  };

  // Handle completion and navigation
  const handleComplete = () => {
    if (documentItem?.id) {
      const { id: documentId } = documentItem;
      dispatch(clearDocumentSuggestions());
      dispatch(resetUploadInfo());
      setTimeout(() => {
        notification.success("Now you can chat with this document!");
        navigate(`/chatdoc/${documentId}`);
      }, 1);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (documentItem && isMounted) {
      setCurrentTab("complete");
      notification.success(
        "File upload & document details saved successfully.",
      );
    }

    return () => {
      isMounted = false;
    };
  }, [documentItem]);

  // Listen for the result
  useEffect(() => {
    if (isGenerated && isWaitingForSuggestion && suggestions?.length > 0) {
      const randomIndex = Math.floor(Math.random() * suggestions.length);
      const generated =
        isWaitingForSuggestion === "title"
          ? suggestions[randomIndex].title
          : suggestions[randomIndex].description;

      form.setValue(isWaitingForSuggestion, generated);
      notification.success(`Generated ${isWaitingForSuggestion} with AI`);
      setIsWaitingForSuggestion(null); // Reset
    }
  }, [isGenerated, suggestions, isWaitingForSuggestion]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 gradient-text">Upload Document</h1>
      <Loading isLoading={!!isWaitingForSuggestion || isUploading}></Loading>
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger
            value="upload"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary relative"
            disabled={true}
          >
            <span className="absolute -top-4 left-2 text-xs font-medium text-purple-600">
              Step 1/3
            </span>
            Upload
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary relative"
            disabled={true}
          >
            <span className="absolute -top-4 left-2 text-xs font-medium text-purple-600">
              Step 2/3
            </span>
            Document Details
          </TabsTrigger>
          <TabsTrigger
            value="complete"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary relative"
            disabled={true}
          >
            <span className="absolute -top-4 left-2 text-xs font-medium text-purple-600">
              Step 3/3
            </span>
            Complete
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <Card className="p-6 flex flex-col items-center justify-center border-2 border-dashed">
            <div
              className="w-full h-48 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors p-6"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-center text-gray-500">
                {!uploadedFile?.name ? (
                  <>
                    Click here to upload or drag and drop
                    <br />a single PDF file here!
                  </>
                ) : (
                  <>{uploadedFile?.name}</>
                )}
              </p>
              <Input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf"
              />
            </div>

            <div className="mt-8 w-full flex justify-end">
              <Button
                disabled={!uploadedFile && !isProcessing}
                onClick={() => setCurrentTab("details")}
                className="px-6"
              >
                {isProcessing ? "Checking pdf..." : "Next"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card className="p-6">
            <div className="mb-6 flex items-center">
              <CheckCircle className="text-green-500 mr-2" />
              <div>
                <p className="font-medium">Document attached!</p>
                <p className="text-sm text-gray-500">
                  Now complete document's details.
                </p>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitDetails)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>Title</FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => generateWithAI("title")}
                          className="text-xs"
                        >
                          <Wand2 className="mr-1 h-3.5 w-3.5" />
                          Generate it by AI
                        </Button>
                      </div>
                      <FormControl>
                        <Input placeholder="Type document's title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>Summary</FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => generateWithAI("summary")}
                          className="text-xs"
                        >
                          <Wand2 className="mr-1 h-3.5 w-3.5" />
                          Generate it by AI
                        </Button>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="Write a brief description about this document."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentTab("upload")}
                  >
                    Back
                  </Button>
                  <Button type="submit">
                    Complete <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </TabsContent>

        <TabsContent value="complete">
          <Card className="p-8 flex flex-col items-center text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Well done!</h2>
            <p className="text-gray-600 mb-6">
              Now you can chat with this document!
            </p>
            <p className="mb-2 text-sm text-gray-500">{uploadedFile?.name}</p>
            <div className="mt-8 flex items-center justify-center">
              <Button className="px-6" onClick={handleComplete}>
                <MessageSquareText className="mr-2" />
                Chat With Document <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs mt-8 text-gray-400">Step 3/3</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UploadDocument;
