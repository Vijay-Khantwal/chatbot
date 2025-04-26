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

## Project Structure
