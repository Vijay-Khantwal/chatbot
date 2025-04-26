import { useState, useEffect, useRef } from "react";
import axios from "axios";

function ChatWindow({ currentSession, setCurrentSession }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // Corrected loading state
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (currentSession) {
      setMessages(currentSession.messages || []);
    } else {
      setMessages([]);
    }
    scrollToBottom();
  }, [currentSession]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true); // Start loading state

    try {
      await axios.post("http://localhost:3001/api/chat", {
        message: input,
        sessionId: currentSession?.id || Date.now().toString(),
        history: updatedMessages,
      });

      const response = await axios.post("http://localhost:3001/api/chat", {
        message: input,
        sessionId: currentSession?.id || Date.now().toString(),
        history: updatedMessages,
      });

      const { reply, source, action, status } = response.data;

      let finalReply = reply || "No response";

      if (action) finalReply += `\n\n**Action:** ${action}`;
      if (source) finalReply += `\n\n**Source:** ${source}`;

      const aiMessage = { text: finalReply, sender: "ai" };
      const newUpdatedMessages = [...updatedMessages, aiMessage];
      setMessages(newUpdatedMessages);

      const session = {
        id: currentSession?.id || Date.now().toString(),
        messages: newUpdatedMessages,
        timestamp: new Date().toISOString(),
        name: newUpdatedMessages.find(msg => msg.sender === "user")?.text?.slice(0, 50) || "New Chat"
      };
      setCurrentSession(session);

      await axios.post("http://localhost:3001/api/save-session", session);
    } catch (error) {
      console.error("Error in sendMessage:", error);
      setMessages([
        ...updatedMessages,
        { text: "Error fetching response", sender: "ai" },
      ]);
    } finally {
      setLoading(false); // Stop loading state regardless of success or failure
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    sendMessage(e);
  };

  const parseTextToHtml = (text) => {
    if (!text) return "<p>No response available</p>";

    // Replace HTML-like tags with actual HTML
    let html = text
      .replace(/<h1>(.*?)<\/h1>/g, '<h1 class="text-2xl font-bold text-blue-600 mb-4">$1</h1>')
      .replace(/<h2>(.*?)<\/h2>/g, '<h2 class="text-xl font-semibold text-blue-600 mb-3">$1</h2>')
      .replace(/<h3>(.*?)<\/h3>/g, '<h3 class="text-lg font-medium text-blue-600 mb-2">$1</h3>')
      .replace(/<b>(.*?)<\/b>/g, '<span class="font-bold">$1</span>')
      .replace(/<i>(.*?)<\/i>/g, '<span class="italic">$1</span>')
      .replace(/<u>(.*?)<\/u>/g, '<span class="underline">$1</span>')
      .replace(/<mark>(.*?)<\/mark>/g, '<span class="bg-yellow-200 px-1">$1</span>')
      .replace(/<div class="info">(.*?)<\/div>/g, '<div class="bg-blue-50 border-l-4 border-blue-500 p-3 my-4 rounded">$1</div>')
      .replace(/<div class="warning">(.*?)<\/div>/g, '<div class="bg-yellow-50 border-l-4 border-yellow-500 p-3 my-4 rounded">$1</div>')
      .replace(/<div class="success">(.*?)<\/div>/g, '<div class="bg-green-50 border-l-4 border-green-500 p-3 my-4 rounded">$1</div>')
      .replace(/<span class="blue">(.*?)<\/span>/g, '<span class="text-blue-600">$1</span>')
      .replace(/<span class="red">(.*?)<\/span>/g, '<span class="text-red-600">$1</span>')
      .replace(/<span class="green">(.*?)<\/span>/g, '<span class="text-green-600">$1</span>')
      .replace(/<span class="gray">(.*?)<\/span>/g, '<span class="text-gray-600">$1</span>')
      .replace(/<ul>(.*?)<\/ul>/g, '<ul class="list-disc pl-5 my-3">$1</ul>')
      .replace(/<ol>(.*?)<\/ol>/g, '<ol class="list-decimal pl-5 my-3">$1</ol>')
      .replace(/<li>(.*?)<\/li>/g, '<li class="mb-2">$1</li>');

    return html;
  };

  const startNewChat = () => {
    setCurrentSession(null);
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300">
      <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 relative">
        {messages.length === 0 && !loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center animate-fade-in">
            <img
              src="./image.png"
              alt="App Logo"
              className="w-32 h-32 mb-6 opacity-90 transform hover:scale-105 transition-transform duration-300"
            />
            <p className="text-2xl text-gray-600 font-medium">How may I assist you today?</p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-6 p-4 px-5 text-lg rounded-xl max-w-[75%] w-fit shadow-md transform transition-all duration-200 ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white ml-auto text-right animate-slide-in-right"
                    : "bg-white text-gray-800 animate-slide-in-left"
                }`}
              >
                {msg.sender === "user" ? (
                  msg.text
                ) : (
                  <div className="flex items-start gap-2">
                    <img 
                      src="./image.png" 
                      alt="AI Assistant" 
                      className="w-6 h-6 rounded-full object-cover bg-blue-100 p-1"
                    />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: parseTextToHtml(msg.text),
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="mb-6 p-4 px-5 text-lg rounded-xl max-w-[75%] w-fit bg-gray-200 text-gray-600 shadow-md animate-pulse">
                Thinking...
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={sendMessage} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-3 rounded-full border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 placeholder-gray-400 transition-all duration-200"
            placeholder="Ask anything..."
            disabled={loading} // Disable input while loading
          />
          <button
            type="submit"
            className={`bg-blue-600 text-white px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 flex items-center gap-2 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 cursor-pointer"
            }`}
            disabled={loading} // Disable button while loading
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatWindow;