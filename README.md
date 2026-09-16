# Orbiit-ChatGPT 🤖💬

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16-brightgreen)](https://nodejs.org/)
[![OpenAI](https://img.shields.io/badge/AI-OpenAI-blueviolet)](https://openai.com/)
[![Status](https://img.shields.io/badge/status-active-success)](#)

A full-stack **AI chat application** that integrates an interactive frontend with a secure backend to communicate with **OpenAI’s ChatGPT models**.  
The backend safely proxies API requests while the frontend delivers a clean, real-time conversational experience.

---

## Main Language Composition
- JavaScript — 60%
- React / Frontend Templates — 25%
- CSS — 15%

---

## Table of Contents

- [Demo](#demo)
- [What This Project Is](#what-this-project-is)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Security](#security)
- [Deployment](#deployment)


---

## Demo

- Live Demo: *(Add deployed URL here)*
- Screenshots: *(Add screenshots inside `/Frontend/public`)*

---

## What This Project Is

**Orbiit-ChatGPT** is a modern AI chat platform built for learning and experimentation:

- Secure backend proxy for OpenAI API calls
- Real-time conversational UI
- Clean separation of frontend and backend
- Environment-based configuration for production readiness

This architecture makes it easy to extend with authentication, database persistence, or multi-model support.

---

## Features

- Conversational chat powered by OpenAI
- Secure backend API proxy (API keys never exposed)
- Conversation history support
- Responsive, modern UI
- Environment-based configuration
- Modular frontend & backend design

---

## Tech Stack

### Frontend
- React / Vite (or Next.js)
- JavaScript
- HTML & CSS

### Backend
- Node.js
- Express.js
- OpenAI API

### Tools & Platforms
- Git & GitHub
- Render / Vercel (Deployment)
- npm

---

## Prerequisites

- Node.js 16+
- npm / yarn / pnpm
- Git
- OpenAI API Key

---

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/akhileshlonkar/Orbiit-Chatgpt.git
cd Orbiit-Chatgpt
2. Backend Setup
cd backend
npm install
npm run dev
3. Frontend Setup
cd Frontend
npm install
npm run dev
Open your browser at:

http://localhost:3000

or http://localhost:5173

(depending on frontend setup)

Configuration
Backend .env
PORT=8080
OPENAI_API_KEY=sk-xxxx
SESSION_SECRET=your_secret_key
Frontend .env
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=Orbiit-ChatGPT
VITE_DEFAULT_MODEL=gpt-4o-mini
Scripts
Backend
npm run dev — Development server

npm start — Production server

Frontend
npm run dev — Development mode

npm run build — Production build

Project Structure
Orbiit-ChatGPT/
├── Frontend/        # Frontend UI
├── backend/         # Backend API server
├── .gitignore
├── README.md
└── package.json
Security
API keys are stored securely in environment variables

Backend prevents client-side exposure of secrets

.env files are excluded via .gitignore

Deployment
Backend: Render / Railway / Heroku

Frontend: Vercel / Netlify

Environment variables configured on hosting platform

