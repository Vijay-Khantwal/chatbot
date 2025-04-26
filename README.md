# Vigil AI: AI-Based Home Security Assistant

Vigil AI is an intelligent chatbot designed to act as a virtual home security consultant. It leverages the power of Google's Gemini AI to provide personalized security assessments, tailored advice, and answers to specific security-related questions based on simulated event data.

## Features

*   **Interactive Security Assessment:** Guides users through a structured assessment based on their location, property type, and specific concerns.
*   **Tailored Security Advice:** Delivers clear, actionable recommendations formatted for readability (using headings, lists, etc.).
*   **Simulated Event Queries:** Answers questions about predefined, simulated home security events (e.g., "What happened in the backyard today?").
*   **Contextual Conversation:** Maintains chat history within a session for better understanding and follow-up questions.
*   **Session Persistence:** Saves and loads chat sessions, allowing users to resume conversations.
*   **Safety & Focus:** Includes safeguards against off-topic questions, profanity, and basic prompt injection attempts.
*   **User-Friendly Interface:** Clean and responsive chat interface built with React and Tailwind CSS.
*   **History Panel:** Allows users to review past messages within the current session.

## Technology Stack

*   **Frontend:** React, Vite, Tailwind CSS, Axios
*   **Backend:** Node.js, Express
*   **AI Model:** Google Gemini 1.5 Flash API
*   **Data Storage:** Local JSON files for session history


## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd chatbot
    ```
2.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    cd ..
    ```
3.  **Install frontend dependencies:**
    ```bash
    npm install
    ```
4.  **Create a `.env` file** in the root `chatbot` directory and add your Google Gemini API key:
    ```env
    # filepath: c:\Users\vkhan\OneDrive\Desktop\dd\LPU\Sem 4\AI\AI Project\chatbot\.env
    VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
    *(Remember to add `.env` to your `.gitignore` file if it's not already there!)*
5.  **Start the backend server:**
    ```bash
    cd backend
    node server.js
    ```
    *(The backend will run on `http://localhost:5000` by default)*
6.  **Start the frontend development server:**
    *(Open a new terminal in the root `chatbot` directory)*
    ```bash
    npm run dev
    ```
    *(The frontend will be accessible at `http://localhost:5173` or another port specified by Vite)*

## Usage

1.  Open the application in your web browser (usually `http://localhost:5173`).
2.  Start interacting with the chatbot by typing messages in the input field.
3.  Follow the chatbot's prompts to conduct a security assessment or ask specific security questions.
4.  Use the "Save Session" button to store the current conversation.
5.  Use the "Load Session" button and select a timestamp to resume a previous conversation.
6.  The history panel on the right shows the messages for the currently active session.