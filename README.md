🚀 Freelancer Marketplace (Fiverr Clone)
A high-performance, full-stack freelance marketplace built with the MERN Stack. This platform allows users to register as either clients or freelancers, post services (gigs), manage orders, and communicate in real-time.

![alt text](https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200)

🌐 Live Demo
Frontend: https://freelance-marketplace-alpha.vercel.app
Backend API: https://freelance-backend-a4ar.onrender.com

📊 Project Overview
This project demonstrates the implementation of a complex multi-role system. It features advanced e-commerce logic, secure authentication, and real-time interaction between users.
Key Features:
Dual-Role Auth: Users can register as "Buyers" or "Sellers."
Service Discovery: Advanced search and category filtering (Web, Design, AI, etc.).
Gig Management: Sellers can create, edit, and delete their own service listings.
Real-time Chat: Instant messaging between buyers and sellers using Socket.io.
Transaction Flow: A simulated payment processing system to manage order creation.
Reviews & Ratings: Dynamic rating system where buyers leave feedback that updates the freelancer's profile.
Responsive Dashboard: Dedicated views for tracking active orders and messages.

🛠️ Tech Stack

Frontend

React.js (Vite)
Tailwind CSS (Styling)
Lucide React (Icons)
Axios (API Requests)
React Router Dom (Navigation)

Backend

Node.js & Express.js
MongoDB & Mongoose (Database)
JWT & Cookies (Secure Auth)
Socket.io (Real-time WebSockets)
Bcrypt.js (Password Hashing)

📂 Project Structure
/freelance-marketplace
├── /client (React Frontend)
│   ├── /src
│   │   ├── /components  # Reusable UI elements (Navbar, GigCard)
│   │   ├── /pages       # Main views (Home, Login, Gig, Orders, Message)
│   │   └── App.jsx      # Routing Configuration
├── /server (Node Backend)
│   ├── /controllers     # Business Logic
│   ├── /models          # MongoDB Schemas (User, Gig, Order, Message)
│   ├── /routes          # API Endpoints
│   ├── /middleware      # JWT Verification
│   └── index.js         # Entry Point

🚀 Installation & Local Setup

1.Clone the repository:
git clone https://github.com/manasa-ma/freelance-marketplace.git
cd freelance-marketplace

2.Setup Backend:
cd server
npm install

Create a .env file in the /server folder and add:
MONGO_URI=your_mongodb_connection_string
JWT_KEY=your_secret_key
PORT=5000
Start the server: node index.js

3.Setup Frontend:
cd ../client
npm install
npm run dev

🛡️ Deployment
Frontend: Deployed on Vercel with optimized build settings.
Backend: Deployed on Render (Web Service).
Database: Hosted on MongoDB Atlas (Cloud).

💡 Learning Outcomes (Internship)
Mastered the integration of a MERN Stack application.
Implemented secure JWT-based authentication with HTTP-only cookies.
Developed Real-time bi-directional communication using WebSockets.
Designed a Database Schema for relational-style data in a NoSQL environment.
Successfully managed Production Deployment across multiple cloud providers.

👤 Author
Guduri Manasa
LinkedIn: [www.linkedin.com/in/manasa-guduri-a7b992262]
GitHub: @manasa-ma


