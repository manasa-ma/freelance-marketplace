import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Gig from "./pages/Gig";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Add from "./pages/Add";
import MyGigs from "./pages/MyGigs";
import Orders from "./pages/Orders"; // Add this import
import Message from "./pages/Message";
import Messages from "./pages/Messages"; // Inbox

// Components
import Navbar from "./components/Navbar";

const Footer = () => (
  <footer className="py-10 border-t text-center text-gray-500 mt-20">
    <p>© 2024 Freelancer Marketplace Clone. All rights reserved.</p>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gig/:id" element={<Gig />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add" element={<Add />} />
            <Route path="/mygigs" element={<MyGigs />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/message/:id" element={<Message />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;