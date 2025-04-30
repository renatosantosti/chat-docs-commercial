
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
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
import { CheckCircle, Upload, ChevronRight, ArrowRight, Wand2 } from "lucide-react";
import { toast as notification } from "sonner";
import { useToast } from "@/hooks/use-toast";

const UploadDocument = () => {  
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form for document details
  const form = useForm({
    defaultValues: {
      title: "",
      summary: "",
    },
  });

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (file.type !== "application/pdf") {
        notification.error("Please upload a PDF file");
        return;
      }
      
      // Simulate file upload
      setIsUploading(true);
      setTimeout(() => {
        setUploadedFile(file);
        setIsUploading(false);
        setCurrentTab("details");
      }, 1500);
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      if (file.type !== "application/pdf") {
        notification.error("Please upload a PDF file");
        return;
      }
      
      // Simulate file upload
      setIsUploading(true);
      setTimeout(() => {
        setUploadedFile(file);
        setIsUploading(false);
        notification.success("File upload loaded, not saved yet!");
        setCurrentTab("details");
      }, 1500);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle document details submission
  const onSubmitDetails = (values: { title: string; summary: string }) => {
    
    if(form.getValues("title") === "" || form.getValues("summary") === ""){
        toast({
          title: "Please enter all required fields.",
          description: "Both title and summary are required!",
          variant: "destructive",

        });
        return;     
    } else{
    // In a real app, you'd save this to a database
    console.log("Document details:", { ...values, file: uploadedFile });
    setCurrentTab("complete");
    notification.success("File upload & document details saved successfully.");
    }

  };

  // Generate content with AI
  const generateWithAI = (field: "title" | "summary") => {
    // In a real app, this would call an AI service
    notification.info("Generating content with AI...");
    
    setTimeout(() => {
      if (field === "title") {
        const generatedTitle = `${uploadedFile?.name.split('.')[0]} Analysis Document`;
        form.setValue("title", generatedTitle);
      } else {
        form.setValue("summary", "This document contains important information about the subject matter, with key insights and data points that can be referenced later.");
      }
      notification.success(`Generated ${field} with AI`);
    }, 1000);
  };

  // Handle completion and navigation
  const handleComplete = () => {
    notification.success("Document uploaded and ready for chat!");
    navigate("/documents");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 gradient-text">Upload Document</h1>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger 
            value="upload" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary relative"
            disabled={currentTab !== "upload" && !uploadedFile}
          >
            <span className="absolute -top-4 left-2 text-xs font-medium text-purple-600">Step 1/3</span>
            Upload
          </TabsTrigger>
          <TabsTrigger 
            value="details" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary relative"
            disabled={currentTab === "upload" || currentTab === "complete" && !uploadedFile}
          >
            <span className="absolute -top-4 left-2 text-xs font-medium text-purple-600">Step 2/3</span>
            Document Details
          </TabsTrigger>
          <TabsTrigger 
            value="complete" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary relative"
            disabled={currentTab === "upload" || currentTab === "details"}
          >
            <span className="absolute -top-4 left-2 text-xs font-medium text-purple-600">Step 3/3</span>
            Complete
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-6">
          <Card className="p-6 flex flex-col items-center justify-center border-2 border-dashed">
            <div 
              className="w-full h-48 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors p-6"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-center text-gray-500">
                {
                  !uploadedFile?.name 
                              ? <>Click here to upload or drag and drop
                              <br />a single PDF file here!</>
                              : <>{uploadedFile?.name}</>
                }
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
                disabled={!uploadedFile && !isUploading} 
                onClick={() => setCurrentTab("details")}
                className="px-6"
              >
                {isUploading ? "Checking pdf..." : "Next"} 
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
                <p className="font-medium">Document uploaded successfully!</p>
                <p className="text-sm text-gray-500">Now complete document's details.</p>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitDetails)} className="space-y-6">
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
            <p className="mb-2 text-sm text-gray-500">
              {uploadedFile?.name}
            </p>
            <div className="mt-8 flex items-center justify-center">
              <Button 
                className="px-6"
                onClick={handleComplete}
              >
                Chat With Document <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs mt-8 text-gray-400">
              Step 3/3
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UploadDocument;
