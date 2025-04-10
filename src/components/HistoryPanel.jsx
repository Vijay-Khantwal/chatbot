import { useState, useEffect } from 'react';
import axios from 'axios';

function HistoryPanel({ show, setShow, setCurrentSession }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const response = await axios.get('http://localhost:3001/api/sessions');
      setSessions(response.data);
    };
    fetchSessions();
  }, []);

  const handleSessionClick = (session) => {
    console.log("Loading session:", session);
    setCurrentSession(session);
  };

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 absolute top-0 left-0 h-full ${show ? 'w-64' : 'w-0'}`}>
      <div className="p-4">
        <button
          onClick={() => setShow(!show)}
          className="mb-4 bg-primary text-white text-lg cursor-pointer px-2 py-1 rounded"
        >
          {show ? 'Hide' : 'History'}
        </button>
        {show && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Chat History</h2>
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => handleSessionClick(session)}
                className="p-2 hover:bg-gray-100 text-sm cursor-pointer rounded"
              >
                {new Date(session.timestamp).toLocaleString()}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPanel;