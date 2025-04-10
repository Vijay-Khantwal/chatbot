import { useState } from 'react';
import HistoryPanel from '../components/HistoryPanel';
import ChatWindow from '../components/ChatWindow';
import Header from '../components/Header';
function Chat() {
  const [showHistory, setShowHistory] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Header */}
      <Header />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar History Panel */}
        <HistoryPanel
          show={showHistory}
          setShow={setShowHistory}
          setCurrentSession={setCurrentSession}
        />

        {/* Chat Window in center */}
        <div className="flex-1 flex justify-center items-start p-4">
          <div className="w-full max-w-4xl h-[calc(100vh-100px)] shadow-2xl fixed top-[90px] left-1/2 transform -translate-x-1/2">
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
