import * as RadioGroup from "@radix-ui/react-radio-group";
import Highlighter from "react-highlight-words";
import { Typewriter } from "react-simple-typewriter";
import { Search, Download, Bot } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { askQuestion, chatRequest, ChatState } from "@/store/chat/slices";
import { ChatMode } from "@/shared/types";
import { DocumentState } from "@/store/document/slices";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/Loading";

const ChatDoc = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((store: { chat: ChatState }) => store.chat);
  const docState = useSelector(
    (store: { document: DocumentState }) => store.document,
  );
  const { id } = useParams<{ id: string }>();
  const { isLoading, wasActivated, filtered, response } = state;
  const limitText = 1130;
  const documentId = parseInt(id || "0");

  const [pages, setPages] = useState([]);
  const [priviousTerm, setPriviousTerm] = useState("");
  const [mode, setMode] = useState<ChatMode>("chat");
  const [searchTerm, setSearchTerm] = useState("");
  const [showTermHistory, setShowTermHistory] = useState(true);

  const result = state.results.filter((r) => r.documentId == documentId);
  const hasResults = result.length > 0;

  useEffect(() => {
    if (hasResults) {
      setPages(result[0].pages);
      setPriviousTerm(result[0].term);

      if (searchTerm === "" && showTermHistory) setSearchTerm(result[0].term);
    }
  }, [hasResults, result]);

  useEffect(() => {
    if (
      !id ||
      isNaN(parseInt(id, 10)) ||
      docState.documents.filter((doc) => doc.id == documentId).length === 0
    ) {
      navigate("/documents");
    }
  }, [id, navigate, docState]);

  const doc = docState.documents.filter((doc) => doc.id == documentId)[0];
  const documentName = doc?.title;

  const notImplemented = () => {
    alert(
      "It was not integrated on UI yet, please see it working on REST API by Swagger.",
    );
  };

  const handleChatSearchClick = () => {
    dispatch(
      chatRequest({
        documentId,
        mode,
        term: searchTerm,
      }),
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold gradient-text">
          <b>{mode === "chat" ? "Chatting with:" : "Search in:"} </b>
          {documentName}
        </h1>
      </div>

      {/* Search Input */}
      <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2">
        <Search className="w-5 h-5 text-gray-500 mr-3" />
        <input
          type="text"
          placeholder={
            mode === "chat" ? "Ask something" : "Search term on all pages..."
          }
          className="w-full outline-none text-gray-700 placeholder:text-gray-400"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowTermHistory(false);
            dispatch(askQuestion());
          }}
        />
      </div>
      {/* Mode Toggle & Button */}
      <div className="flex items-center justify-between">
        <RadioGroup.Root
          className="flex gap-6"
          value={mode}
          onValueChange={(val) => {
            setMode(val as ChatMode);
            dispatch(askQuestion());
          }}
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroup.Item
              value="chat"
              className="w-4 h-4 rounded-full border border-black flex items-center justify-center"
            >
              {mode === "chat" && (
                <div className="w-2 h-2 bg-black rounded-full" />
              )}
            </RadioGroup.Item>
            <span className="text-sm text-gray-800">AI Chat Doc</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroup.Item
              value="pages"
              className="w-4 h-4 rounded-full border border-black flex items-center justify-center"
            >
              {mode === "pages" && (
                <div className="w-2 h-2 bg-black rounded-full" />
              )}
            </RadioGroup.Item>
            <span className="text-sm text-gray-800">Search Term</span>
          </label>
        </RadioGroup.Root>

        <Button
          className="Button-gradient px-4 py-2 rounded hover:opacity-90 transition"
          onClick={handleChatSearchClick}
        >
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
              key={response}
              words={[response]}
              loop={1}
              typeSpeed={25}
              cursor
              cursorStyle="_"
              onLoopDone={() => {}}
            />
          </p>
        </div>
      )}
      <Loading isLoading={isLoading}></Loading>

      {pages.length > 0 && (
        <div className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
          <p>
            You have {pages.length || 0} page(s)
            {priviousTerm && (
              <>
                {mode === "chat"
                  ? " related to question: "
                  : " matching with term: "}
                <span className="text-red-500">{priviousTerm}</span>
              </>
            )}
          </p>
        </div>
      )}
      {/* Grid View */}
      {pages.length > 0 ? (
        <div className="rounded-md border border-gray-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-12 bg-gray-100 text-sm font-medium text-gray-700 px-4 py-3">
            <div className="col-span-2">Page Number</div>
            <div className="col-span-8">Source Text</div>
            <div className="col-span-2"></div>
          </div>
          {pages.map((res, index) => (
            <div
              key={index}
              className="grid grid-cols-12 items-center px-4 py-3 border-t text-sm"
            >
              <div className="col-span-2 text-gray-700">{res.pageNumber}</div>
              <div className="col-span-8 text-gray-600">
                <Highlighter
                  highlightClassName=""
                  searchWords={[...searchTerm.split(" ")]}
                  autoEscape={true}
                  textToHighlight={
                    res.content.length > 100
                      ? `${res.content.substring(0, limitText)}...`
                      : res.content
                  }
                />
              </div>
              <div className="col-span-2 text-right">
                <Button
                  className="flex items-center gap-2 px-3 py-1 text-sm border rounded  hover:opacity-90 transition"
                  onClick={() => notImplemented()}
                >
                  <Download className="w-4 h-4" />
                  Download page
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        mode === "pages" &&
        filtered &&
        pages.length === 0 && (
          <div className="relative justify-center bg-gray-50 border border-gray-200 p-6 rounded-md shadow-sm">
            <p className="text-sm text-gray-800">Empty Result.</p>
          </div>
        )
      )}

      {/* Full Document Download */}
      <div className="text-right">
        <Button
          className="Button-gradient inline-flex items-center gap-2 px-5 py-2 rounded hover:opacity-90 transition"
          onClick={() => notImplemented()}
        >
          <Download className="w-4 h-4" />
          Download Full Document
        </Button>
      </div>
    </div>
  );
};

export default ChatDoc;
