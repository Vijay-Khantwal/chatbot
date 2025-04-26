import { useState, useEffect } from 'react';
import HistoryPanel from '../components/HistoryPanel';
import ChatWindow from '../components/ChatWindow';
import Header from '../components/Header';
import axios from 'axios';

function Chat() {
  const [showHistory, setShowHistory] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  // Load last active session on component mount
  useEffect(() => {
    const loadLastSession = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/sessions");
        if (response.data.length > 0) {
          setCurrentSession(response.data[0]);
        }
      } catch (error) {
        console.error("Error loading last session:", error);
      }
    };

    loadLastSession();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden relative">
        <HistoryPanel
          show={showHistory}
          setShow={setShowHistory}
          setCurrentSession={setCurrentSession}
        />

        {/* Chat Window in center */}
        <div className="flex-1 flex justify-center items-start p-6 transition-all duration-300">
          <div className="w-full max-w-5xl h-[calc(100vh-120px)] fixed top-[100px] left-1/2 transform -translate-x-1/2">
            <ChatWindow
              currentSession={currentSession}
              setCurrentSession={setCurrentSession}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;