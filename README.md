
# Orbiit-ChatGPT 🤖💬

🚀 **Live Demo:** https://orbiit-chat-gpt.vercel.app

A full-stack AI chat application built with React, Node.js, Express.js, MongoDB Atlas, and the Groq API.

Orbiit provides a conversational chat interface where users can create new conversations, continue previous conversations, switch between chat threads, and delete conversations.

---

## Features

- 🤖 AI-powered conversations using Groq API
- 💬 Clean conversational chat interface
- 🧠 Conversation memory using MongoDB Atlas
- 📂 Previous chat history
- 🔄 Continue existing conversations
- 🗑️ Delete conversations
- 📌 Recently used conversations move to the top
- ⚡ React-based frontend
- 🔐 API keys stored using environment variables
- 📝 Markdown support for AI responses
- 💻 REST API using Express.js

---

## Tech Stack

### Frontend

- React.js
- JavaScript
- CSS
- Vite
- React Markdown
- Remark GFM
- Rehype Highlight

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API

### AI

- Groq API
- `openai/gpt-oss-20b`

### Tools

- Git
- GitHub
- VS Code
- MongoDB Atlas
- npm

---

## Project Architecture

```text
User
  ↓
React Frontend
  ↓
Express.js Backend
  ↓
Groq API
  ↓
AI Response
  ↓
MongoDB Atlas
  ↓
Conversation History
