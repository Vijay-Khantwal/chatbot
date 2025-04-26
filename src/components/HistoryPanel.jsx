import { useState, useEffect } from "react";
import axios from "axios";

function HistoryPanel({ show, setShow, setCurrentSession }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const response = await axios.get("http://localhost:3001/api/sessions");
      setSessions(response.data);
    };
    fetchSessions();
  }, []);

  const handleSessionClick = (session) => {
    console.log("Loading session:", session);
    setCurrentSession(session);
    setShow(false);
  };

  const startNewChat = () => {
    setCurrentSession(null);
    setShow(false);
  };

  return (
    <div className="relative flex h-full">
      {/* History and New Chat Buttons - Always Visible */}
      {!show && (
        <div className="fixed top-24 left-4 z-0 flex flex-col gap-2">
          <button
            onClick={() => setShow(!show)}
            className="bg-blue-600 text-white text-lg font-medium px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={show ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
            {show ? "Hide" : "History"}
          </button>
          <button
            onClick={startNewChat}
            className="bg-indigo-600 text-white text-lg font-medium px-4 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            New Chat
          </button>
        </div>
      )}

      {/* Collapsible History Panel */}
      <div
        className={`bg-white shadow-xl transition-all duration-500 ease-in-out fixed top-0 left-0 h-full z-10 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 ${
          show ? "w-72 translate-x-0" : "w-0 -translate-x-full"
        }`}
      >
        <div className="p-5 h-full flex flex-col">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Chat History
            </h2>
            {show && (
              <div className="flex flex-col gap-2 mb-4">
                <button
                  onClick={() => setShow(!show)}
                  className="bg-blue-600 text-white px-6 text-lg font-medium cursor-pointer py-2 rounded-full hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 shadow-lg"
                >
                  Hide
                </button>
                <button
                  onClick={startNewChat}
                  className="bg-indigo-600 text-white px-6 text-lg font-medium cursor-pointer py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 shadow-lg"
                >
                  New Chat
                </button>
              </div>
            )}

            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => handleSessionClick(session)}
                className="p-3 hover:bg-gray-100 text-sm text-gray-700 cursor-pointer rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {session.name || "New Chat"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPanel;
