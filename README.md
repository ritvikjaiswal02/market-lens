📊 Market Lens

Market Lens is a full-stack market dashboard for tracking digital assets with real-time prices, watchlists, portfolio tracking, and historical price visualization.
It is built as a scalable, secure web application with authentication and a clean, modern UI.

This project was developed as part of a frontend internship assignment with an emphasis on UI quality, frontend–backend integration, security, and scalability.

✨ Features
🔐 Authentication

User registration and login

JWT-based authentication

Protected routes (dashboard accessible only after login)

Secure password hashing

📈 Market Dashboard

Search digital assets using live market data

Add/remove assets to a personal watchlist

Maintain a portfolio with quantities

Auto-calculated total portfolio value

7-day historical price charts per asset

📊 Data & Visualization

Real-time market prices

Percentage change indicators

Interactive price charts

Graceful handling of unavailable data

🎨 UI/UX

Modern dark theme

Responsive layout

Clean dashboard structure

Optimized for readability and usability

🛠 Tech Stack
Frontend

React

React Router

Tailwind CSS

Axios

Chart-based visualization

Backend

Node.js

Express

MongoDB

JWT Authentication

REST APIs

External APIs

CoinGecko (market data & historical prices)

🚀 Getting Started
Prerequisites

Node.js (v18+ recommended)

MongoDB (local or Atlas)

npm

Backend Setup
cd backend
npm install


Create .env:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Run backend:

npm run dev

Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔐 Security Practices

Passwords hashed using bcrypt

JWT validation middleware

Protected API routes

Environment variables for secrets

📈 Scalability Notes

Modular frontend structure (components, services, context)

Backend organized by routes, controllers, and models

API-based architecture ready for microservice separation

Can be extended with:

Role-based access

Admin analytics

WebSocket-based live updates

Caching layer (Redis)

📬 Submission Notes

GitHub repository includes full frontend and backend

APIs tested via Postman

Clean commit history

Ready for deployment

📌 Author

Ritvik Jaiswal
Frontend / Full Stack Developer
