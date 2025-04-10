import { useState, useEffect, useRef } from "react"; // Add useRef
import axios from "axios";

function ChatWindow({ currentSession, setCurrentSession }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null); // Create a ref for the bottom of the chat

  useEffect(() => {
    console.log("Current session updated:", currentSession);
    if (currentSession) {
      setMessages(currentSession.messages || []);
    } else {
      setMessages([]);
    }
    scrollToBottom(); // Scroll to bottom when session changes
  }, [currentSession]);

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when messages update
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

    try {
      console.log("Sending message to API:", input);
      const response = await axios.post("http://localhost:3001/api/chat", {
        message: input,
        sessionId: currentSession?.id || Date.now().toString(),
      });

      console.log("API Response:", response.data);

      const aiMessage = { text: response.data.reply, sender: "ai" };
      const newUpdatedMessages = [...updatedMessages, aiMessage];
      console.log("Updating messages:", newUpdatedMessages);
      setMessages(newUpdatedMessages);

      const session = {
        id: currentSession?.id || Date.now().toString(),
        messages: newUpdatedMessages,
        timestamp: new Date().toISOString(),
      };
      console.log("Updating session:", session);
      setCurrentSession(session);

      console.log("Saving session to server");
      await axios.post("http://localhost:3001/api/save-session", session);
      console.log("Session saved successfully");
    } catch (error) {
      console.error("Error in sendMessage:", error);
      setMessages([
        ...updatedMessages,
        { text: "Error fetching response", sender: "ai" },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed");
      e.preventDefault();
      sendMessage(e);
    }
  };

  const handleButtonClick = (e) => {
    console.log("Send button clicked");
    e.preventDefault();
    sendMessage(e);
  };

  const parseTextToHtml = (text) => {
    if (!text) return "<p>No response available</p>";

    let html = text;
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    const lines = html.split("\n");
    let inList = false;
    html = lines
      .map((line) => {
        if (line.trim().startsWith("-")) {
          const item = line.replace("-", "").trim();
          if (!inList) {
            inList = true;
            return `<ul><li>${item}</li>`;
          }
          return `<li>${item}</li>`;
        }
        if (inList) {
          inList = false;
          return `</ul>${line}`;
        }
        return line;
      })
      .join("\n");
    if (inList) html += "</ul>";

    return html;
  };

  return (
    <div className="flex flex-col h-full bg-chatBg rounded-lg shadow-lg">
      <div className="flex-1 p-4 overflow-y-auto relative">
        {messages.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <img
              src="./image.png"
              alt="App Logo"
              className="w-24 h-24 mb-4 opacity-80"
            />
            <p className="text-xl text-gray-500">How may I help you today?</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 p-3 px-4 text-lg rounded-lg max-w-[70%] w-fit ${
                msg.sender === "user"
                  ? "bg-primary text-white ml-auto text-right"
                  : "bg-white text-gray-800"
              }`}
            >
              {msg.sender === "user" ? (
                msg.text
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: parseTextToHtml(msg.text),
                  }}
                />
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} /> {/* Empty div at the bottom */}
      </div>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-2 rounded-lg border text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ask about your home security..."
          />
          <button
            type="button"
            onClick={handleButtonClick}
            className="bg-primary text-white px-4 py-2 text-sm cursor-pointer rounded-lg hover:bg-secondary transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;






// import { useState, useEffect, useRef } from "react"; // Add useRef
// import axios from "axios";

// function ChatWindow({ currentSession, setCurrentSession }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null); // Create a ref for the bottom of the chat

//   useEffect(() => {
//     console.log("Current session updated:", currentSession);
//     if (currentSession) {
//       setMessages(currentSession.messages || []);
//     } else {
//       setMessages([]);
//     }
//     scrollToBottom(); // Scroll to bottom when session changes
//   }, [currentSession]);

//   useEffect(() => {
//     scrollToBottom(); // Scroll to bottom when messages update
//   }, [messages]);

//   const scrollToBottom = () => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const sendMessage = async (e) => {
//     if (e) e.preventDefault();

//     if (!input.trim()) return;

//     const newMessage = { text: input, sender: "user" };
//     const updatedMessages = [...messages, newMessage];
//     setMessages(updatedMessages);
//     setInput("");

//     try {
//       console.log("Sending message to API:", input);
//       const response = await axios.post("http://localhost:3001/api/chat", {
//         message: input,
//         sessionId: currentSession?.id || Date.now().toString(),
//       });

//       console.log("API Response:", response.data);

//       const aiMessage = { text: response.data.reply, sender: "ai" };
//       const newUpdatedMessages = [...updatedMessages, aiMessage];
//       console.log("Updating messages:", newUpdatedMessages);
//       setMessages(newUpdatedMessages);

//       const session = {
//         id: currentSession?.id || Date.now().toString(),
//         messages: newUpdatedMessages,
//         timestamp: new Date().toISOString(),
//       };
//       console.log("Updating session:", session);
//       setCurrentSession(session);

//       console.log("Saving session to server");
//       await axios.post("http://localhost:3001/api/save-session", session);
//       console.log("Session saved successfully");
//     } catch (error) {
//       console.error("Error in sendMessage:", error);
//       setMessages([
//         ...updatedMessages,
//         { text: "Error fetching response", sender: "ai" },
//       ]);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       console.log("Enter key pressed");
//       e.preventDefault();
//       sendMessage(e);
//     }
//   };

//   const handleButtonClick = (e) => {
//     console.log("Send button clicked");
//     e.preventDefault();
//     sendMessage(e);
//   };

//   const parseTextToHtml = (text) => {
//     if (!text) return "<p>No response available</p>";

//     let html = text;
//     html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
//     html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

//     const lines = html.split("\n");
//     let inList = false;
//     html = lines
//       .map((line) => {
//         if (line.trim().startsWith("-")) {
//           const item = line.replace("-", "").trim();
//           if (!inList) {
//             inList = true;
//             return `<ul><li>${item}</li>`;
//           }
//           return `<li>${item}</li>`;
//         }
//         if (inList) {
//           inList = false;
//           return `</ul>${line}`;
//         }
//         return line;
//       })
//       .join("\n");
//     if (inList) html += "</ul>";

//     return html;
//   };

//   return (
//     <div className="flex flex-col h-full bg-chatBg rounded-lg shadow-lg">
//       <div className="flex-1 p-4 overflow-y-auto relative">
//         {messages.length === 0 ? (
//           <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
//             <img
//               src="./image.png"
//               alt="App Logo"
//               className="w-24 h-24 mb-4 opacity-80"
//             />
//             <p className="text-xl text-gray-500">How may I help you today?</p>
//           </div>
//         ) : (
//           messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`mb-4 p-3 px-4 text-lg rounded-lg max-w-[70%] w-fit ${
//                 msg.sender === "user"
//                   ? "bg-primary text-white ml-auto text-right"
//                   : "bg-white text-gray-800"
//               }`}
//             >
//               {msg.sender === "user" ? (
//                 msg.text
//               ) : (
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: parseTextToHtml(msg.text),
//                   }}
//                 />
//               )}
//             </div>
//           ))
//         )}
//         <div ref={messagesEndRef} /> {/* Empty div at the bottom */}
//       </div>
//       <div className="p-4 border-t">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="flex-1 p-2 rounded-lg border text-lg focus:outline-none focus:ring-2 focus:ring-primary"
//             placeholder="Ask about your home security..."
//           />
//           <button
//             type="button"
//             onClick={handleButtonClick}
//             className="bg-primary text-white px-4 py-2 text-sm cursor-pointer rounded-lg hover:bg-secondary transition"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatWindow;