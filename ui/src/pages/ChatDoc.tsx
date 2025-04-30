import * as RadioGroup from "@radix-ui/react-radio-group";
import Highlighter from "react-highlight-words";
import { Typewriter } from "react-simple-typewriter";
import { Search, Download, Bot } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const mockResults = [
  {
    page: 1,
    text: "Demonstrated expertise in developing scalable web applications using TypeScript and React, ensuring responsive and user-friendly interfaces.",
  },
  {
    page: 2,
    text: "Implemented RESTful APIs with Node.js and Express, facilitating seamless communication between front-end and back-end systems.",
  },
  {
    page: 7,
    text: "Optimized database queries, resulting in a 30% improvement in application performance and reduced load times.",
  },
  {
    page: 4,
    text: "Led a team of 5 developers, overseeing project timelines and ensuring the delivery of high-quality software solutions.",
  },
];

const ChatDoc = () => {
  const [mode, setMode] = useState("search");
  const [searchTerm, setSearchTerm] = useState("");
  const [typedText, setTypedText] = useState(
    `Hi guys, I will leverage this moment to speak a little bit about me...well as you know I am Renato Santos. 
    During my career, I worked in different industries and with different approaches to solving problems. So, I am flexible, innovative, and fast-paced to learn new things. 
    I feel free to explore new things and jump to another new technology whenever it is needed or I will explore it.
    I THINK SOLUTION IS MORE THAN TECHNOLOGIES - SO TECH IS TOOLS TO BE USED AND COMBINED TO ACHIEVE A SMART SOLUTION.
    Be an expert is good, I am an expert whenever I have been working for a long time with certain stuff, but I am always ready to explore new things, that´s my spirit. Sorry to stop your flow! 
    Go ahead, ask something to the doc!`
  );

  const documentName = "My Resume.pdf";

  const notImplemented =  () =>{
    alert('It was not integrated on UI yet, please see it working on REST API by Swagger.')
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold gradient-text">
          {mode === "chat" ? "Chatting with" : "Search in"}: <b>{documentName}</b>
        </h1>
      </div>

      {/* Search Input */}
      <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2">
        <Search className="w-5 h-5 text-gray-500 mr-3" />
        <input
          type="text"
          placeholder={mode === "chat" ? "Ask something" : "Search term on all pages..."}
          className="w-full outline-none text-gray-700 placeholder:text-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Mode Toggle & Button */}
      <div className="flex items-center justify-between">
        <RadioGroup.Root className="flex gap-6" value={mode} onValueChange={setMode}>
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroup.Item
              value="chat"
              className="w-4 h-4 rounded-full border border-black flex items-center justify-center"
            >
              {mode === "chat" && <div className="w-2 h-2 bg-black rounded-full" />}
            </RadioGroup.Item>
            <span className="text-sm text-gray-800">AI Chat Doc</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroup.Item
              value="search"
              className="w-4 h-4 rounded-full border border-black flex items-center justify-center"
            >
              {mode === "search" && <div className="w-2 h-2 bg-black rounded-full" />}
            </RadioGroup.Item>
            <span className="text-sm text-gray-800">Search Term</span>
          </label>
        </RadioGroup.Root>

        <Button className="Button-gradient px-4 py-2 rounded hover:opacity-90 transition">
          {`${mode === "chat" ? " Chat" : "Search"} Now`}
        </Button>
      </div>

      {/* AI Generated Text */}
      {mode === "chat" && (
        <div className="relative bg-gray-50 border border-gray-200 p-6 rounded-md shadow-sm">
          <div className="absolute top-4 right-4 text-gray-400">
            <Bot className="w-5 h-5" />
          </div>
          <p className="text-sm text-gray-800">
            <Typewriter
              words={[typedText]}
              loop={1}
              typeSpeed={25}
              cursor
              cursorStyle="_"
              onLoopDone={() => setTypedText("")}
            />
          </p>
        </div>
      )}

      {/* Grid View */}
      <div className="rounded-md border border-gray-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-12 bg-gray-100 text-sm font-medium text-gray-700 px-4 py-3">
          <div className="col-span-2">Page Number</div>
          <div className="col-span-8">Source Text</div>
          <div className="col-span-2"></div>
        </div>
        {mockResults.map((res, index) => (
          <div key={index} className="grid grid-cols-12 items-center px-4 py-3 border-t text-sm">
            <div className="col-span-2 text-gray-700">{res.page}</div>
            <div className="col-span-8 text-gray-600">
              <Highlighter
                    highlightClassName="YourHighlightClass"
                    searchWords={[...searchTerm.split(" ")]}
                    autoEscape={true}
                    textToHighlight={res.text}
                />
            </div>
            <div className="col-span-2 text-right">
              <Button className="flex items-center gap-2 px-3 py-1 text-sm border rounded  hover:opacity-90 transition" onClick={()=> notImplemented()}>
                <Download className="w-4 h-4" />
                Download page
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Document Download */}
      <div className="text-right">
        <Button className="Button-gradient inline-flex items-center gap-2 px-5 py-2 rounded hover:opacity-90 transition" onClick={()=> notImplemented()}>
          <Download className="w-4 h-4" />
          Download Full Document
        </Button>
      </div>
    </div>
  );
};

export default ChatDoc;